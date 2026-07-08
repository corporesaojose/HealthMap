'use client'

export const dynamic = 'force-dynamic'

import { useState, useCallback } from 'react'
import type { FormState, Step, IpmAnswers } from '@/lib/health-map/types'
import { PILLARS } from '@/lib/health-map/questions'
import { calculateResult } from '@/lib/health-map/scoring'
import { saveAssessment } from '@/lib/db/saveAssessment'
import { trackLead, trackStartQuiz } from '@/lib/meta-pixel'
import { sendEventToMetaCapi } from '@/lib/meta-capi-webhook'

import WelcomeScreen from '@/components/health-map/WelcomeScreen'
import PersonalDataScreen from '@/components/health-map/PersonalDataScreen'
import PillarScreen from '@/components/health-map/PillarScreen'
import PillarFeedback from '@/components/health-map/PillarFeedback'
import AnalyzingScreen from '@/components/health-map/AnalyzingScreen'
import IpmScreen from '@/components/health-map/IpmScreen'
import RegistrationScreen from '@/components/health-map/RegistrationScreen'
import ResultScreen from '@/components/health-map/ResultScreen'
import type { QuestionAnswer } from '@/lib/health-map/types'
import type { HealthMapResult } from '@/lib/health-map/types'

const INITIAL_STATE: FormState = {
  personal: { sex: null, age: '', weight: '', height: '' },
  pillarAnswers: {},
  ipm: {},
  registration: { name: '', phone: '', email: '', neighborhood: '', activityLevel: null },
}

type IpmStepType = 'readiness' | 'obstacle' | 'confidence' | 'future_mental'
const IPM_STEPS: IpmStepType[] = ['readiness', 'obstacle', 'confidence', 'future_mental']

export default function HealthMapPage() {
  const [step, setStep] = useState<Step>({ type: 'welcome' })
  const [formState, setFormState] = useState<FormState>(INITIAL_STATE)
  const [ipmStepIndex, setIpmStepIndex] = useState(0)
  const [result, setResult] = useState<HealthMapResult | null>(null)

  // Computed radar slices for completed pillars
  const completedPillarScores = PILLARS.map((p, i) => {
    const answers = formState.pillarAnswers[i]
    const avg = answers?.length ? Math.round(answers.reduce((s, a) => s + a.score, 0) / answers.length) : 0
    return { name: p.name, displayName: p.displayName, emoji: p.emoji, color: p.radarColor, weight: p.weight, score: avg }
  }).filter((_, i) => (formState.pillarAnswers[i]?.length ?? 0) > 0)

  function goToStep(s: Step) {
    setStep(s)
  }

  // Step handlers
  function handleWelcomeStart() {
    const eventId = crypto.randomUUID()
    trackStartQuiz(eventId)
    sendEventToMetaCapi({ eventName: 'StartQuiz', eventId })
    goToStep({ type: 'personal' })
  }

  function handlePersonalNext() {
    goToStep({ type: 'pillar', pillarIndex: 0, questionIndex: 0 })
  }

  function handlePillarComplete(pillarIndex: number, answers: QuestionAnswer[]) {
    setFormState(fs => ({
      ...fs,
      pillarAnswers: { ...fs.pillarAnswers, [pillarIndex]: answers },
    }))
    goToStep({ type: 'pillar_feedback', pillarIndex })
  }

  function handlePillarFeedbackNext(pillarIndex: number) {
    const nextIndex = pillarIndex + 1
    if (nextIndex < PILLARS.length) {
      goToStep({ type: 'pillar', pillarIndex: nextIndex, questionIndex: 0 })
    } else {
      goToStep({ type: 'analyzing' })
    }
  }

  function handleAnalyzingDone() {
    goToStep({ type: 'ipm_readiness' })
    setIpmStepIndex(0)
  }

  function handleIpmNext() {
    const nextIndex = ipmStepIndex + 1
    if (nextIndex < IPM_STEPS.length) {
      setIpmStepIndex(nextIndex)
      const nextType = `ipm_${IPM_STEPS[nextIndex]}` as Step['type']
      // Map ipm step names to step types
      const stepMap: Record<IpmStepType, Step['type']> = {
        readiness: 'ipm_readiness',
        obstacle: 'ipm_obstacle',
        confidence: 'ipm_confidence',
        future_mental: 'ipm_future',
      }
      goToStep({ type: stepMap[IPM_STEPS[nextIndex]] })
    } else {
      goToStep({ type: 'calculating' })
    }
  }

  function handleCalculatingDone() {
    const res = calculateResult(formState)
    setResult(res)
    goToStep({ type: 'registration' })
  }

  async function handleRegistrationNext() {
    if (result) {
      const assessId = await saveAssessment(formState.registration, result, formState.pillarAnswers)
      if (assessId) {
        const eventId = crypto.randomUUID()
        trackLead(eventId)
        sendEventToMetaCapi({ eventName: 'Lead', eventId, registration: formState.registration })
      }
    }
    goToStep({ type: 'result' })
  }

  function updateIpm(answers: Partial<IpmAnswers>) {
    setFormState(fs => ({ ...fs, ipm: answers }))
  }

  // Get current pillar scores for radar display
  const allPillarScores = PILLARS.map((p, i) => {
    const answers = formState.pillarAnswers[i]
    const score = answers?.length ? Math.round(answers.reduce((s, a) => s + a.score, 0) / answers.length) : 0
    return { name: p.name, displayName: p.displayName, emoji: p.emoji, color: p.radarColor, weight: p.weight, score }
  })

  // Determine IPM step type from current step
  const ipmStepName = IPM_STEPS[ipmStepIndex]

  return (
    <>
      {step.type === 'welcome' && (
        <WelcomeScreen onStart={handleWelcomeStart} />
      )}

      {step.type === 'personal' && (
        <PersonalDataScreen
          data={formState.personal}
          onChange={personal => setFormState(fs => ({ ...fs, personal }))}
          onNext={handlePersonalNext}
        />
      )}

      {step.type === 'pillar' && step.pillarIndex !== undefined && (
        <PillarScreen
          key={`pillar-${step.pillarIndex}`}
          pillar={PILLARS[step.pillarIndex]}
          pillarIndex={step.pillarIndex}
          completedPillarScores={completedPillarScores}
          onComplete={answers => handlePillarComplete(step.pillarIndex!, answers)}
        />
      )}

      {step.type === 'pillar_feedback' && step.pillarIndex !== undefined && (
        <PillarFeedback
          key={`feedback-${step.pillarIndex}`}
          pillar={PILLARS[step.pillarIndex]}
          pillarScore={
            (() => {
              const a = formState.pillarAnswers[step.pillarIndex!]
              return a?.length ? Math.round(a.reduce((s, x) => s + x.score, 0) / a.length) : 0
            })()
          }
          completedPillarScores={completedPillarScores}
          isLastPillar={step.pillarIndex === PILLARS.length - 1}
          onNext={() => handlePillarFeedbackNext(step.pillarIndex!)}
        />
      )}

      {step.type === 'analyzing' && (
        <AnalyzingScreen
          pillarScores={allPillarScores}
          onDone={handleAnalyzingDone}
        />
      )}

      {(step.type === 'ipm_readiness' ||
        step.type === 'ipm_obstacle' ||
        step.type === 'ipm_confidence' ||
        step.type === 'ipm_future') && (
        <IpmScreen
          key={`ipm-${ipmStepIndex}`}
          currentStep={ipmStepName}
          answers={formState.ipm}
          onChange={updateIpm}
          onNext={handleIpmNext}
        />
      )}

      {step.type === 'calculating' && (
        <AnalyzingScreen
          pillarScores={allPillarScores}
          onDone={handleCalculatingDone}
          isCalculating
        />
      )}

      {step.type === 'registration' && (
        <RegistrationScreen
          data={formState.registration}
          onChange={registration => setFormState(fs => ({ ...fs, registration }))}
          onNext={handleRegistrationNext}
        />
      )}

      {step.type === 'result' && result && (
        <ResultScreen result={result} firstName={formState.registration.name.trim().split(' ')[0] || ''} />
      )}
    </>
  )
}

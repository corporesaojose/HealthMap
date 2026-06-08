'use client'

import { useEffect, useState } from 'react'
import type { Pillar } from '@/lib/health-map/questions'
import type { QuestionAnswer } from '@/lib/health-map/types'
import ProgressBar from './ProgressBar'
import RadarChart from './RadarChart'
import { PILLARS } from '@/lib/health-map/questions'

interface PillarScreenProps {
  pillar: Pillar
  pillarIndex: number
  completedPillarScores: { name: string; score: number; color: string; emoji: string; displayName: string; weight: number }[]
  onComplete: (answers: QuestionAnswer[]) => void
}

type MicrofeedbackType = 'great' | 'improve' | null

export default function PillarScreen({ pillar, pillarIndex, completedPillarScores, onComplete }: PillarScreenProps) {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<QuestionAnswer[]>([])
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [microfeedback, setMicrofeedback] = useState<MicrofeedbackType>(null)
  const [transitioning, setTransitioning] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(false)
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [questionIndex, pillarIndex])

  const currentQuestion = pillar.questions[questionIndex]

  function handleSelect(optionIndex: number, score: number) {
    if (transitioning) return
    setSelectedOption(optionIndex)
    const feedback: MicrofeedbackType = score >= 60 ? 'great' : 'improve'
    setMicrofeedback(feedback)
    setTransitioning(true)

    const newAnswer: QuestionAnswer = { questionIndex, optionIndex, score }
    const newAnswers = [...answers, newAnswer]

    setTimeout(() => {
      setMicrofeedback(null)
      setSelectedOption(null)

      if (questionIndex < pillar.questions.length - 1) {
        setAnswers(newAnswers)
        setQuestionIndex(qi => qi + 1)
        setTransitioning(false)
      } else {
        onComplete(newAnswers)
      }
    }, 900)
  }

  // Build radar slices including current pillar as "in progress"
  const radarSlices = PILLARS.map((p, i) => {
    const completed = completedPillarScores.find(c => c.name === p.name)
    if (completed) return completed
    const base = { name: p.name, displayName: p.displayName, emoji: p.emoji, color: p.radarColor, weight: p.weight }
    if (i === pillarIndex) return { ...base, score: 10 }
    return { ...base, score: 0 }
  })

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: 'radial-gradient(circle at top right, rgba(47,111,110,0.4), transparent 50%), linear-gradient(160deg, #0D2B2B 0%, #0f3333 60%, #164646 100%)',
      }}
    >
      {/* Top: radar + progress */}
      <div className="flex flex-col items-center pt-8 pb-4 px-6 gap-4">
        <ProgressBar currentPillar={pillarIndex} />

        <div style={{ opacity: 0.9 }}>
          <RadarChart slices={radarSlices} size={180} animated />
        </div>
      </div>

      {/* Question area */}
      <div className="flex-1 flex flex-col justify-center px-6 pb-12 max-w-lg mx-auto w-full">
        {/* Pilar label */}
        <div
          className="flex items-center gap-2 mb-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          <span className="text-2xl">{pillar.emoji}</span>
          <span className="font-sora text-sm font-semibold tracking-widest uppercase" style={{ color: '#D7E94A' }}>
            {pillar.displayName}
          </span>
          <span className="ml-auto font-inter text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {questionIndex + 1}/{pillar.questions.length}
          </span>
        </div>

        {/* Question text */}
        <h2
          className="font-sora font-bold text-white mb-2"
          style={{
            fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
            lineHeight: 1.3,
            letterSpacing: '-0.02em',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.4s ease 0.05s, transform 0.4s ease 0.05s',
          }}
        >
          {currentQuestion.text}
        </h2>

        {currentQuestion.subtext && (
          <p
            className="font-inter text-sm mb-5"
            style={{
              color: 'rgba(255,255,255,0.45)',
              opacity: visible ? 1 : 0,
              transition: 'opacity 0.4s ease 0.1s',
            }}
          >
            {currentQuestion.subtext}
          </p>
        )}

        {!currentQuestion.subtext && <div className="mb-5" />}

        {/* Options */}
        <div className="flex flex-col gap-2">
          {currentQuestion.options.map((option, i) => {
            const isSelected = selectedOption === i
            return (
              <button
                key={i}
                onClick={() => handleSelect(i, option.score)}
                disabled={transitioning}
                className="flex items-center gap-3 px-4 py-3 rounded-xl font-inter text-sm text-left transition-all duration-200 hover:-translate-y-0.5 disabled:cursor-default"
                style={{
                  background: isSelected
                    ? 'rgba(215,233,74,0.18)'
                    : 'rgba(255,255,255,0.06)',
                  border: isSelected
                    ? '1.5px solid #D7E94A'
                    : '1px solid rgba(255,255,255,0.1)',
                  color: isSelected ? '#D7E94A' : 'rgba(255,255,255,0.85)',
                  opacity: visible ? 1 : 0,
                  transform: visible
                    ? isSelected ? 'translateX(4px)' : 'translateY(0)'
                    : 'translateY(10px)',
                  transition: `opacity 0.35s ease ${0.12 + i * 0.06}s, transform 0.35s ease ${0.12 + i * 0.06}s, background 0.2s, border-color 0.2s`,
                }}
              >
                <span className="text-xl flex-shrink-0">{option.emoji}</span>
                <span className="font-medium">{option.label}</span>
                {isSelected && (
                  <span className="ml-auto" style={{ color: '#D7E94A' }}>✓</span>
                )}
              </button>
            )
          })}
        </div>

        {/* Microfeedback */}
        <div
          className="mt-5 flex items-center justify-center gap-2 py-3 rounded-xl font-inter text-sm font-semibold"
          style={{
            opacity: microfeedback ? 1 : 0,
            background: microfeedback === 'great'
              ? 'rgba(215,233,74,0.12)'
              : microfeedback === 'improve'
              ? 'rgba(255,107,107,0.1)'
              : 'transparent',
            border: microfeedback
              ? `1px solid ${microfeedback === 'great' ? 'rgba(215,233,74,0.3)' : 'rgba(255,107,107,0.2)'}`
              : '1px solid transparent',
            color: microfeedback === 'great' ? '#D7E94A' : '#ff9a9a',
            transition: 'opacity 0.3s ease, background 0.3s ease',
          }}
        >
          {microfeedback === 'great' ? (
            <><span>⚡</span><span>Excelente!</span></>
          ) : microfeedback === 'improve' ? (
            <><span>💡</span><span>Há espaço para melhorar esse pilar.</span></>
          ) : null}
        </div>
      </div>
    </div>
  )
}

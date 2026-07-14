import type { RegistrationData, HealthMapResult, PillarAnswers, IpmAnswers } from '@/lib/health-map/types'
import { PILLARS } from '@/lib/health-map/questions'

function flattenPillarAnswers(pillarAnswers: PillarAnswers) {
  const flat = []
  for (const [pillarIndexStr, answers] of Object.entries(pillarAnswers)) {
    const pillarIndex = Number(pillarIndexStr)
    const pillar = PILLARS[pillarIndex]
    if (!pillar) continue
    for (const answer of answers) {
      const question = pillar.questions[answer.questionIndex]
      if (!question) continue
      const option = question.options[answer.optionIndex]
      flat.push({
        pillarName: pillar.name,
        pillarDisplayName: pillar.displayName,
        questionIndex: answer.questionIndex,
        questionText: question.text,
        optionLabel: option?.label ?? '',
        score: answer.score,
      })
    }
  }
  return flat
}

export interface SaveAssessmentResult {
  assessId: string
  reportToken: string
}

export async function saveAssessment(
  registration: RegistrationData,
  result: HealthMapResult,
  pillarAnswers?: PillarAnswers,
  ipm?: Partial<IpmAnswers>
): Promise<SaveAssessmentResult | null> {
  try {
    const flatAnswers = pillarAnswers ? flattenPillarAnswers(pillarAnswers) : []
    const response = await fetch('/api/save-assessment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ registration, result, pillarAnswers: flatAnswers, ipm }),
    })
    const data = await response.json()
    if (!data.success) {
      console.error('Erro ao salvar:', data.error)
      return null
    }
    return { assessId: String(data.assessId), reportToken: String(data.reportToken) }
  } catch (error) {
    console.error('Erro ao salvar assessment:', error)
    return null
  }
}

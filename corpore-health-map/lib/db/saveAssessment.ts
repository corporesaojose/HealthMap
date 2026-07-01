import type { RegistrationData, HealthMapResult } from '@/lib/health-map/types'

export async function saveAssessment(
  registration: RegistrationData,
  result: HealthMapResult
): Promise<string | null> {
  try {
    const response = await fetch('/api/save-assessment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ registration, result }),
    })
    const data = await response.json()
    if (!data.success) {
      console.error('Erro ao salvar:', data.error)
      return null
    }
    return String(data.assessId)
  } catch (error) {
    console.error('Erro ao salvar assessment:', error)
    return null
  }
}

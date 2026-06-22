import { supabase } from './client'
import type { RegistrationData } from '@/lib/health-map/types'
import type { HealthMapResult } from '@/lib/health-map/types'

export async function saveAssessment(
  registration: RegistrationData,
  result: HealthMapResult
): Promise<string | null> {
  // 1. Salva o lead
  const { data: lead, error: leadError } = await supabase
    .from('leads')
    .insert({
      name: registration.name,
      phone: registration.phone,
      email: registration.email,
      neighborhood: registration.neighborhood,
      activity_level: registration.activityLevel,
    })
    .select('id')
    .single()

  if (leadError || !lead) {
    console.error('Erro ao salvar lead:', leadError)
    return null
  }

  // 2. Salva o resultado do assessment
  const { data: assessment, error: assessmentError } = await supabase
    .from('assessments')
    .insert({
      lead_id: lead.id,
      health_score: result.healthScore,
      health_score_class: result.healthScoreClass,
      ipm: result.ipm,
      ipm_class: result.ipmClass,
      imc: result.imc,
      imc_class: result.imcClass,
      profile_id: result.profile.id,
      profile_name: result.profile.name,
      pillar_scores: result.pillarScores,
      strongest_pillar: result.strongestPillar.name,
      weakest_pillar: result.weakestPillar.name,
      priority_pillar: result.priorityPillar.name,
      sex: null,
      age: result.age,
    })
    .select('id')
    .single()

  if (assessmentError || !assessment) {
    console.error('Erro ao salvar assessment:', assessmentError)
    return null
  }

  return assessment.id
}

export type Sex = 'masculino' | 'feminino' | 'nao_informar'

export interface PersonalData {
  sex: Sex | null
  age: string
  weight: string
  height: string
}

export type ActivityLevel =
  | 'sedentario'
  | 'caminhada_corrida'
  | 'esportes'
  | 'academia'
  | 'pilates_crossfit_spinning_bootcamp'

export interface RegistrationData {
  name: string
  phone: string
  email: string
  neighborhood: string
  activityLevel: ActivityLevel | null
}

export interface QuestionAnswer {
  questionIndex: number
  optionIndex: number
  score: number
}

export interface PillarAnswers {
  [pillarIndex: number]: QuestionAnswer[]
}

export interface IpmAnswers {
  readiness: number
  obstacle: string
  confidence: number
  future: string
  mentalFatigue: string
}

export interface FormState {
  personal: PersonalData
  pillarAnswers: PillarAnswers
  ipm: Partial<IpmAnswers>
  registration: RegistrationData
}

export interface PillarScore {
  name: string
  displayName: string
  score: number
  weight: number
  emoji: string
  color: string
}

export interface Profile {
  id: string
  name: string
  tagline: string
  description: string
  emoji: string
}

export interface HealthMapResult {
  healthScore: number
  ipm: number
  imc: number | null
  imcClass: string | null
  pillarScores: PillarScore[]
  profile: Profile
  strongestPillar: PillarScore
  weakestPillar: PillarScore
  priorityPillar: PillarScore
  healthScoreClass: string
  ipmClass: string
  obstacle: string
  age: number | null
  potentialScore: number
}

export type StepType =
  | 'welcome'
  | 'personal'
  | 'pillar'
  | 'pillar_feedback'
  | 'analyzing'
  | 'ipm_readiness'
  | 'ipm_obstacle'
  | 'ipm_confidence'
  | 'ipm_future'
  | 'calculating'
  | 'registration'
  | 'result'

export interface Step {
  type: StepType
  pillarIndex?: number
  questionIndex?: number
}

import { PILLARS, IPM_FUTURE_OPTIONS, IPM_MENTAL_OPTIONS } from './questions'
import type { FormState, HealthMapResult, PillarScore, Profile } from './types'

const PROFILES: Profile[] = [
  {
    id: 'guardian',
    name: 'Guardião da Saúde',
    tagline: 'Seus hábitos são seu maior patrimônio.',
    description:
      'Você mantém uma rotina consistente que protege sua saúde em múltiplos pilares. Isso é raro e valioso. O desafio agora é manter essa consistência e continuar evoluindo com intencionalidade.',
    emoji: '🏆',
  },
  {
    id: 'unbalanced',
    name: 'Atleta em Desequilíbrio',
    tagline: 'Forte no corpo, mas em déficit de recuperação.',
    description:
      'Você se move muito, mas pode estar negligenciando o sono ou acumulando estresse. Corpo forte com recuperação insuficiente é uma equação que cobra a conta mais cedo ou mais tarde.',
    emoji: '⚡',
  },
  {
    id: 'overloaded',
    name: 'Profissional Sobrecarregado',
    tagline: 'Cumprindo responsabilidades às custas de você mesmo.',
    description:
      'Você consegue entregar resultados, mas está pagando um preço alto em energia, sono e estresse. Seu corpo está funcionando — mas gastando mais do que consegue repor.',
    emoji: '🧠',
  },
  {
    id: 'explorer',
    name: 'Explorador da Saúde',
    tagline: 'Você sabe que precisa mudar — e está no momento certo.',
    description:
      'Alguns hábitos ainda não estão no nível ideal, mas você tem clareza sobre isso e motivação para mudar. Essa combinação é mais rara do que parece. O próximo passo é transformar intenção em rotina.',
    emoji: '🌱',
  },
  {
    id: 'alert',
    name: 'Em Alerta Silencioso',
    tagline: 'Seu corpo está dando sinais. Vale ouvir agora.',
    description:
      'Vários pilares da sua saúde precisam de atenção. Isso não é uma sentença — é um diagnóstico. A boa notícia é que hábitos mudam resultados, e você está aqui, mapeando sua saúde.',
    emoji: '🚨',
  },
  {
    id: 'building',
    name: 'Em Construção',
    tagline: 'Boa base, mas com espaço real para evoluir.',
    description:
      'Você tem hábitos razoáveis em alguns pilares, mas a consistência ainda é o desafio. A distância entre onde você está e onde quer chegar é menor do que parece.',
    emoji: '🔨',
  },
]

function getProfile(healthScore: number, pillarScores: PillarScore[], ipm: number): Profile {
  const mov = pillarScores.find(p => p.name === 'movimento')?.score ?? 0
  const stress = pillarScores.find(p => p.name === 'estresse')?.score ?? 0
  const sleep = pillarScores.find(p => p.name === 'sono')?.score ?? 0

  if (healthScore >= 80) return PROFILES.find(p => p.id === 'guardian')!
  if (mov >= 70 && (stress < 45 || sleep < 45)) return PROFILES.find(p => p.id === 'unbalanced')!
  if (stress < 40 || (stress < 50 && sleep < 50)) return PROFILES.find(p => p.id === 'overloaded')!
  if (ipm >= 65 && healthScore < 60) return PROFILES.find(p => p.id === 'explorer')!
  if (healthScore < 45) return PROFILES.find(p => p.id === 'alert')!
  return PROFILES.find(p => p.id === 'building')!
}

function getHealthScoreClass(score: number): string {
  if (score < 40) return 'Reserva de Saúde Comprometida'
  if (score < 60) return 'Caminho para o Marco Zero'
  if (score < 80) return 'Construção de Reserva de Saúde'
  return 'Manutenção e Longevidade'
}

function getIpmClass(score: number): string {
  if (score < 40) return 'Baixa Prontidão'
  if (score < 60) return 'Em Reflexão'
  if (score < 80) return 'Em Preparação'
  return 'Pronto para Agir'
}

function calcImc(weight: number, height: number): { imc: number; imcClass: string } {
  const h = height / 100
  const imc = weight / (h * h)
  let imcClass = ''
  if (imc < 18.5) imcClass = 'Abaixo do peso'
  else if (imc < 25) imcClass = 'Peso normal'
  else if (imc < 30) imcClass = 'Sobrepeso'
  else if (imc < 35) imcClass = 'Obesidade grau I'
  else if (imc < 40) imcClass = 'Obesidade grau II'
  else imcClass = 'Obesidade grau III'
  return { imc: Math.round(imc * 10) / 10, imcClass }
}

export function calculateResult(state: FormState): HealthMapResult {
  const pillarScores: PillarScore[] = PILLARS.map((pillar, idx) => {
    const answers = state.pillarAnswers[idx] || []
    const totalScore = answers.reduce((sum, a) => sum + a.score, 0)
    const avgScore = answers.length > 0 ? Math.round(totalScore / answers.length) : 0
    return {
      name: pillar.name,
      displayName: pillar.displayName,
      score: avgScore,
      weight: pillar.weight,
      emoji: pillar.emoji,
      color: pillar.radarColor,
    }
  })

  const healthScore = Math.round(
    pillarScores.reduce((sum, p) => sum + p.score * p.weight, 0)
  )

  const { readiness = 5, confidence = 5, future = '', mentalFatigue = '' } = state.ipm
  const futureScore = IPM_FUTURE_OPTIONS.find(o => o.label === future)?.score ?? 50
  const mentalScore = IPM_MENTAL_OPTIONS.find(o => o.label === mentalFatigue)?.score ?? 50
  const ipm = Math.round((readiness * 10 + confidence * 10 + futureScore + mentalScore) / 4)

  const weight = parseFloat(state.personal.weight)
  const height = parseFloat(state.personal.height)
  const imcData =
    !isNaN(weight) && !isNaN(height) && weight > 0 && height > 0
      ? calcImc(weight, height)
      : null

  const sorted = [...pillarScores].sort((a, b) => b.score - a.score)
  const strongestPillar = sorted[0]
  const weakestPillar = sorted[sorted.length - 1]

  const priorityPillar = pillarScores.reduce((best, p) => {
    const impact = (100 - p.score) * p.weight
    const bestImpact = (100 - best.score) * best.weight
    return impact > bestImpact ? p : best
  })

  const potentialScore = Math.round(
    pillarScores
      .map(p => (p.name === priorityPillar.name ? { ...p, score: Math.min(p.score + 30, 100) } : p))
      .reduce((sum, p) => sum + p.score * p.weight, 0)
  )

  const profile = getProfile(healthScore, pillarScores, ipm)

  return {
    healthScore,
    ipm,
    imc: imcData?.imc ?? null,
    imcClass: imcData?.imcClass ?? null,
    pillarScores,
    profile,
    strongestPillar,
    weakestPillar,
    priorityPillar,
    healthScoreClass: getHealthScoreClass(healthScore),
    ipmClass: getIpmClass(ipm),
    obstacle: state.ipm.obstacle || '',
    age: state.personal.age ? parseInt(state.personal.age) : null,
    potentialScore,
  }
}

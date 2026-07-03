export interface Option {
  label: string
  score: number
  emoji: string
}

export interface Question {
  id: number
  text: string
  subtext?: string
  options: Option[]
}

export interface Pillar {
  index: number
  name: string
  displayName: string
  emoji: string
  radarColor: string
  weight: number
  intro: string
  questions: Question[]
  feedbackGood: string
  feedbackOk: string
  feedbackImprove: string
}

export const PILLARS: Pillar[] = [
  {
    index: 0,
    name: 'movimento',
    displayName: 'Movimento',
    emoji: '🏃',
    radarColor: '#D7E94A',
    weight: 0.25,
    intro: 'Vamos começar analisando como seu corpo se move.',
    feedbackGood: 'Seu nível de movimento é um ponto forte. Continue assim!',
    feedbackOk: 'Você se movimenta, mas há espaço para evoluir.',
    feedbackImprove: 'Seu corpo pede mais movimento. Esse é um pilar prioritário.',
    questions: [
      {
        id: 1,
        text: 'Quantos dias da última semana você se movimentou por pelo menos 30 minutos?',
        options: [
          { label: 'Nenhum', score: 0, emoji: '😔' },
          { label: '1 dia', score: 20, emoji: '🌱' },
          { label: '2 dias', score: 40, emoji: '💪' },
          { label: '3 a 4 dias', score: 75, emoji: '🔥' },
          { label: '5 dias ou mais', score: 100, emoji: '⚡' },
        ],
      },
      {
        id: 2,
        text: 'Em quantos dias você praticou exercícios de força?',
        subtext: 'Musculação, funcional, crossfit ou similares',
        options: [
          { label: 'Nenhum', score: 0, emoji: '😔' },
          { label: '1 dia', score: 30, emoji: '🌱' },
          { label: '2 dias', score: 70, emoji: '💪' },
          { label: '3 dias ou mais', score: 100, emoji: '🔥' },
        ],
      },
      {
        id: 3,
        text: 'Quanto tempo você fica sentado em um dia comum?',
        options: [
          { label: 'Menos de 4 horas', score: 100, emoji: '✅' },
          { label: '4 a 6 horas', score: 75, emoji: '👍' },
          { label: '6 a 8 horas', score: 45, emoji: '⚠️' },
          { label: 'Mais de 8 horas', score: 20, emoji: '🚨' },
          { label: 'Quase o dia todo', score: 0, emoji: '🔴' },
        ],
      },
    ],
  },
  {
    index: 1,
    name: 'alimentacao',
    displayName: 'Alimentação',
    emoji: '🥗',
    radarColor: '#7BC96F',
    weight: 0.20,
    intro: 'Agora vamos entender como você se alimenta.',
    feedbackGood: 'Sua alimentação está protegendo sua saúde. Ótimo!',
    feedbackOk: 'Você tem bons hábitos alimentares, mas há espaço para melhorar.',
    feedbackImprove: 'Sua alimentação merece mais atenção. Pequenas mudanças fazem grande diferença.',
    questions: [
      {
        id: 4,
        text: 'Em quantos dias da semana você consome frutas e vegetais?',
        options: [
          { label: 'Nunca', score: 0, emoji: '😔' },
          { label: '1 a 2 dias', score: 25, emoji: '🌱' },
          { label: '3 a 4 dias', score: 55, emoji: '👍' },
          { label: '5 a 6 dias', score: 80, emoji: '💚' },
          { label: 'Todos os dias', score: 100, emoji: '⚡' },
        ],
      },
      {
        id: 5,
        text: 'Quantas refeições com alimentos ultraprocessados você faz por semana?',
        subtext: 'Fast food, salgadinhos, comida embalada pronta etc.',
        options: [
          { label: 'Nenhuma', score: 100, emoji: '🏆' },
          { label: '1 a 2', score: 80, emoji: '👍' },
          { label: '3 a 4', score: 55, emoji: '⚠️' },
          { label: '5 a 7', score: 25, emoji: '🚨' },
          { label: 'Mais de 7', score: 0, emoji: '🔴' },
        ],
      },
      {
        id: 6,
        text: 'Com que frequência você toma refrigerantes ou bebidas açucaradas?',
        options: [
          { label: 'Nunca', score: 100, emoji: '🏆' },
          { label: 'Raramente', score: 80, emoji: '👍' },
          { label: '1 a 2x por semana', score: 55, emoji: '⚠️' },
          { label: 'Quase todo dia', score: 20, emoji: '🚨' },
          { label: 'Todo dia', score: 0, emoji: '🔴' },
        ],
      },
    ],
  },
  {
    index: 2,
    name: 'sono',
    displayName: 'Sono',
    emoji: '😴',
    radarColor: '#7B9FC9',
    weight: 0.15,
    intro: 'O sono é quando seu corpo se repara. Vamos ver como está o seu.',
    feedbackGood: 'Seu sono está em boa forma. Isso protege seu cérebro e coração.',
    feedbackOk: 'Seu sono poderia ser mais reparador. Vale investigar.',
    feedbackImprove: 'Seu sono está comprometendo sua recuperação. É um ponto crítico.',
    questions: [
      {
        id: 7,
        text: 'Em média, quantas horas você dorme por noite?',
        options: [
          { label: 'Menos de 5 horas', score: 0, emoji: '🔴' },
          { label: '5 a 6 horas', score: 30, emoji: '⚠️' },
          { label: '6 a 7 horas', score: 65, emoji: '👍' },
          { label: '7 a 8 horas', score: 100, emoji: '⚡' },
          { label: 'Mais de 8 horas', score: 80, emoji: '💤' },
        ],
      },
      {
        id: 8,
        text: 'Com que frequência você acorda durante a noite?',
        options: [
          { label: 'Nunca', score: 100, emoji: '🏆' },
          { label: 'Raramente', score: 80, emoji: '👍' },
          { label: 'Às vezes', score: 55, emoji: '⚠️' },
          { label: 'Frequentemente', score: 25, emoji: '🚨' },
          { label: 'Quase sempre', score: 0, emoji: '🔴' },
        ],
      },
      {
        id: 9,
        text: 'Ao acordar, você sente que seu sono foi reparador?',
        options: [
          { label: 'Quase sempre', score: 100, emoji: '☀️' },
          { label: 'Frequentemente', score: 75, emoji: '👍' },
          { label: 'Às vezes', score: 50, emoji: '⚠️' },
          { label: 'Raramente', score: 25, emoji: '🚨' },
          { label: 'Nunca', score: 0, emoji: '🔴' },
        ],
      },
    ],
  },
  {
    index: 3,
    name: 'estresse',
    displayName: 'Estresse',
    emoji: '🧠',
    radarColor: '#C97BB8',
    weight: 0.15,
    intro: 'O estresse crônico é um dos maiores vilões da saúde moderna.',
    feedbackGood: 'Você gerencia bem o estresse. Isso é uma reserva de saúde.',
    feedbackOk: 'Seu nível de estresse está moderado. Atenção aos sinais do corpo.',
    feedbackImprove: 'Seu estresse está alto. Isso impacta todos os outros pilares.',
    questions: [
      {
        id: 10,
        text: 'Com que frequência você se sente sobrecarregado pelas demandas da vida?',
        options: [
          { label: 'Nunca', score: 100, emoji: '🏆' },
          { label: 'Raramente', score: 80, emoji: '👍' },
          { label: 'Às vezes', score: 55, emoji: '⚠️' },
          { label: 'Frequentemente', score: 25, emoji: '🚨' },
          { label: 'Quase sempre', score: 0, emoji: '🔴' },
        ],
      },
      {
        id: 11,
        text: 'Quantos momentos de lazer ou recuperação você teve na última semana?',
        options: [
          { label: 'Nenhum', score: 0, emoji: '🔴' },
          { label: '1 a 2 momentos', score: 30, emoji: '⚠️' },
          { label: '3 a 4 momentos', score: 65, emoji: '👍' },
          { label: '5 ou mais', score: 100, emoji: '⚡' },
        ],
      },
      {
        id: 12,
        text: 'Ao final do dia, você consegue desligar das preocupações?',
        options: [
          { label: 'Quase sempre', score: 100, emoji: '✅' },
          { label: 'Frequentemente', score: 75, emoji: '👍' },
          { label: 'Às vezes', score: 50, emoji: '⚠️' },
          { label: 'Raramente', score: 25, emoji: '🚨' },
          { label: 'Nunca', score: 0, emoji: '🔴' },
        ],
      },
    ],
  },
  {
    index: 4,
    name: 'relacionamentos',
    displayName: 'Relacionamentos',
    emoji: '🤝',
    radarColor: '#C9A83C',
    weight: 0.10,
    intro: 'A qualidade dos seus vínculos afeta diretamente sua saúde.',
    feedbackGood: 'Seus vínculos sociais são um escudo para sua saúde.',
    feedbackOk: 'Seus relacionamentos estão ok, mas conexões mais profundas fariam diferença.',
    feedbackImprove: 'Isolamento afeta profundamente a saúde. Vale investir em conexões.',
    questions: [
      {
        id: 13,
        text: 'Você tem alguém com quem conversar sobre seus problemas pessoais?',
        options: [
          { label: 'Sim, várias pessoas', score: 100, emoji: '💚' },
          { label: 'Sim, 1 ou 2 pessoas', score: 75, emoji: '👍' },
          { label: 'Às vezes', score: 50, emoji: '⚠️' },
          { label: 'Raramente', score: 25, emoji: '🚨' },
          { label: 'Não', score: 0, emoji: '🔴' },
        ],
      },
      {
        id: 14,
        text: 'Com que frequência você encontra amigos ou familiares presencialmente?',
        options: [
          { label: 'Várias vezes por semana', score: 100, emoji: '⚡' },
          { label: '1x por semana', score: 80, emoji: '👍' },
          { label: 'A cada 2 semanas', score: 55, emoji: '👌' },
          { label: '1x por mês', score: 30, emoji: '⚠️' },
          { label: 'Raramente', score: 0, emoji: '🔴' },
        ],
      },
      {
        id: 15,
        text: 'Você sente que pertence a algum grupo ou comunidade?',
        options: [
          { label: 'Sim, fortemente', score: 100, emoji: '💚' },
          { label: 'Sim, um pouco', score: 70, emoji: '👍' },
          { label: 'Às vezes', score: 45, emoji: '⚠️' },
          { label: 'Raramente', score: 20, emoji: '🚨' },
          { label: 'Não', score: 0, emoji: '🔴' },
        ],
      },
    ],
  },
  {
    index: 5,
    name: 'habitos',
    displayName: 'Hábitos de Saúde',
    emoji: '🛡️',
    radarColor: '#6BCFB8',
    weight: 0.15,
    intro: 'Alguns hábitos protegem sua saúde. Outros a comprometem silenciosamente.',
    feedbackGood: 'Seus hábitos de saúde estão bem alinhados. Continue cuidando.',
    feedbackOk: 'Há alguns hábitos que merecem atenção para proteger sua saúde.',
    feedbackImprove: 'Alguns hábitos estão comprometendo sua reserva de saúde.',
    questions: [
      {
        id: 16,
        text: 'Você fuma ou utiliza nicotina?',
        options: [
          { label: 'Não, nunca', score: 100, emoji: '🏆' },
          { label: 'Já fumei, mas parei', score: 85, emoji: '💪' },
          { label: 'Fumo ocasionalmente', score: 40, emoji: '⚠️' },
          { label: 'Fumo regularmente', score: 0, emoji: '🔴' },
        ],
      },
      {
        id: 17,
        text: 'Quantas doses de bebida alcoólica você consome por semana?',
        subtext: '1 dose = 1 lata de cerveja, 1 taça de vinho ou 1 dose de destilado',
        options: [
          { label: 'Nenhuma', score: 100, emoji: '🏆' },
          { label: '1 a 2 doses', score: 80, emoji: '👍' },
          { label: '3 a 5 doses', score: 50, emoji: '⚠️' },
          { label: '6 a 10 doses', score: 20, emoji: '🚨' },
          { label: 'Mais de 10 doses', score: 0, emoji: '🔴' },
        ],
      },
      {
        id: 18,
        text: 'Nos últimos 12 meses você fez algum check-up ou avaliação de saúde?',
        options: [
          { label: 'Sim, avaliação completa', score: 100, emoji: '✅' },
          { label: 'Sim, parcial', score: 70, emoji: '👍' },
          { label: 'Não, mas planejo', score: 40, emoji: '💡' },
          { label: 'Não', score: 0, emoji: '🔴' },
        ],
      },
    ],
  },
]

export const IPM_OBSTACLES = [
  { label: 'Falta de tempo', emoji: '🕒', value: 'tempo' },
  { label: 'Falta de energia', emoji: '😴', value: 'energia' },
  { label: 'Falta de motivação', emoji: '😔', value: 'motivacao' },
  { label: 'Dor ou limitação física', emoji: '🦴', value: 'dor' },
  { label: 'Estresse', emoji: '😵', value: 'estresse' },
  { label: 'Falta de conhecimento', emoji: '📚', value: 'conhecimento' },
  { label: 'Questões financeiras', emoji: '💰', value: 'financeiro' },
  { label: 'Falta de apoio', emoji: '🤝', value: 'apoio' },
  { label: 'Falta da solução adequada', emoji: '🧩', value: 'solucao' },
  { label: 'Dificuldade de transformar intenção em ação (sei que é importante, mas não consigo mudar)', emoji: '🔄', value: 'intencao_acao' },
  { label: 'Outro', emoji: '💭', value: 'outro' },
]

export const IPM_FUTURE_OPTIONS = [
  { label: 'Muito melhor', score: 100, emoji: '🚀' },
  { label: 'Melhor', score: 75, emoji: '📈' },
  { label: 'Igual', score: 50, emoji: '➡️' },
  { label: 'Pior', score: 25, emoji: '📉' },
  { label: 'Muito pior', score: 0, emoji: '🔴' },
]

export const IPM_MENTAL_OPTIONS = [
  { label: 'Nunca', score: 100, emoji: '🏆' },
  { label: 'Raramente', score: 80, emoji: '👍' },
  { label: 'Às vezes', score: 55, emoji: '⚠️' },
  { label: 'Frequentemente', score: 25, emoji: '🚨' },
  { label: 'Quase sempre', score: 0, emoji: '🔴' },
]

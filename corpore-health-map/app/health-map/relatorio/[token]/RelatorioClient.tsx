'use client'

import { useEffect, useState } from 'react'
import { ScoreRing } from '@/components/health-map/ScoreRing'

interface PillarScoreData {
  name: string
  displayName: string
  score: number
  weight: number
  emoji: string
  color: string
}

interface ReportPillarContent {
  name: string
  scientificSummary: string
  engagementLevel: string
  tools: string[]
  mission15Days: string
}

interface RelatorioClientProps {
  healthScore: number
  healthScoreClass: string
  pillarScores: PillarScoreData[]
  reportPillars: ReportPillarContent[]
  whatsappUrl: string
}

function PillarBlock({ score, content }: { score: PillarScoreData; content?: ReportPillarContent }) {
  if (!content) return null
  const barColor = score.score >= 70 ? '#D7E94A' : score.score >= 45 ? '#FFC85E' : '#ff8a8a'

  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-4"
      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl flex-shrink-0">{score.emoji}</span>
        <div className="flex-1 min-w-0">
          <h2 className="font-sora font-bold text-white" style={{ fontSize: '1.1rem' }}>
            {score.displayName}
          </h2>
          <div
            className="w-full h-1.5 rounded-full overflow-hidden mt-1.5"
            style={{ background: 'rgba(255,255,255,0.1)' }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${score.score}%`,
                background: barColor,
                transition: 'width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            />
          </div>
        </div>
        <span className="font-sora font-bold text-lg flex-shrink-0" style={{ color: barColor }}>
          {score.score}
        </span>
      </div>

      <p className="font-inter text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
        {content.scientificSummary}
      </p>

      <div
        className="rounded-xl p-4"
        style={{ background: 'rgba(215,233,74,0.08)', border: '1px solid rgba(215,233,74,0.2)' }}
      >
        <p className="font-inter text-xs uppercase tracking-widest mb-1" style={{ color: '#D7E94A' }}>
          Onde você está agora
        </p>
        <p className="font-inter text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
          {content.engagementLevel}
        </p>
      </div>

      <div>
        <p
          className="font-inter text-xs uppercase tracking-widest mb-2"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          Ferramentas práticas
        </p>
        <ul className="flex flex-col gap-1.5">
          {content.tools.map((tool, i) => (
            <li
              key={i}
              className="font-inter text-sm flex gap-2"
              style={{ color: 'rgba(255,255,255,0.75)' }}
            >
              <span style={{ color: '#D7E94A' }}>•</span>
              <span>{tool}</span>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="rounded-xl p-4"
        style={{
          background: 'linear-gradient(135deg, rgba(47,111,110,0.3), rgba(13,43,43,0.8))',
          border: '1px solid rgba(47,111,110,0.5)',
        }}
      >
        <p
          className="font-inter text-xs uppercase tracking-widest mb-1"
          style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          🎯 Missão de 15 dias
        </p>
        <p className="font-inter text-sm text-white">{content.mission15Days}</p>
      </div>
    </div>
  )
}

export default function RelatorioClient({
  healthScore,
  healthScoreClass,
  pillarScores,
  reportPillars,
  whatsappUrl,
}: RelatorioClientProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          'radial-gradient(circle at top right, rgba(47,111,110,0.4), transparent 50%), linear-gradient(160deg, #0D2B2B 0%, #0f3333 60%, #164646 100%)',
      }}
    >
      <div style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease' }}>
        <div className="text-center px-6 pt-12 pb-8">
          <span className="text-xs font-sora font-semibold tracking-widest uppercase" style={{ color: '#D7E94A' }}>
            CORPORE HEALTH MAP
          </span>
          <h1
            className="mt-3 font-sora font-bold text-white max-w-lg mx-auto"
            style={{ fontSize: 'clamp(1.5rem, 5vw, 2.25rem)', letterSpacing: '-0.02em', lineHeight: 1.25 }}
          >
            Parar para olhar é o primeiro gesto de quem realmente quer mudar.
          </h1>
          <p
            className="mt-4 font-inter text-sm leading-relaxed max-w-lg mx-auto"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            Seu score revela onde você está hoje — não onde você vai ficar. Nossa equipe pode te ajudar a
            entender o que cada pilar significa para você e, se fizer sentido, mostrar como trabalhamos para
            transformar esse diagnóstico em evolução real, de forma personalizada e no seu ritmo.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 font-sora font-bold text-petroleum rounded-full px-8 py-4 transition-all duration-200 hover:-translate-y-1"
            style={{ background: '#D7E94A', boxShadow: '0 12px 32px rgba(215,233,74,0.35)', fontSize: '1rem' }}
          >
            Quero conversar com a equipe Corpore →
          </a>
        </div>

        <div className="max-w-lg mx-auto px-6 flex flex-col gap-4 pb-6">
          <div
            className="rounded-2xl p-6 flex flex-col items-center gap-2"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <p
              className="font-inter text-xs uppercase tracking-widest"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              Seu Health Score
            </p>
            <ScoreRing score={healthScore} size={180} />
            <p className="font-sora font-bold text-white text-center" style={{ fontSize: '1rem' }}>
              {healthScoreClass}
            </p>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-6 flex flex-col gap-4 pb-16">
          {pillarScores.map(score => (
            <PillarBlock key={score.name} score={score} content={reportPillars.find(p => p.name === score.name)} />
          ))}

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center font-sora font-bold text-petroleum rounded-full py-4 mt-2 transition-all duration-200 hover:-translate-y-1"
            style={{ background: '#D7E94A', boxShadow: '0 12px 32px rgba(215,233,74,0.35)', fontSize: '1rem' }}
          >
            Quero conversar com a equipe Corpore →
          </a>
        </div>
      </div>
    </div>
  )
}

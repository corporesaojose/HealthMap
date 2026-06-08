'use client'

import { useEffect, useState } from 'react'
import type { Pillar } from '@/lib/health-map/questions'
import RadarChart from './RadarChart'
import { PILLARS } from '@/lib/health-map/questions'

interface PillarFeedbackProps {
  pillar: Pillar
  pillarScore: number
  completedPillarScores: { name: string; score: number; color: string; emoji: string; displayName: string; weight: number }[]
  isLastPillar: boolean
  onNext: () => void
}

export default function PillarFeedback({ pillar, pillarScore, completedPillarScores, isLastPillar, onNext }: PillarFeedbackProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  const level: 'good' | 'ok' | 'improve' =
    pillarScore >= 70 ? 'good' : pillarScore >= 45 ? 'ok' : 'improve'

  const levelConfig = {
    good: {
      emoji: '🟢',
      label: 'Forte',
      color: '#D7E94A',
      bg: 'rgba(215,233,74,0.12)',
      border: 'rgba(215,233,74,0.3)',
      message: pillar.feedbackGood,
    },
    ok: {
      emoji: '🟡',
      label: 'Em desenvolvimento',
      color: '#FFC85E',
      bg: 'rgba(255,200,94,0.12)',
      border: 'rgba(255,200,94,0.3)',
      message: pillar.feedbackOk,
    },
    improve: {
      emoji: '🔴',
      label: 'Atenção necessária',
      color: '#ff8a8a',
      bg: 'rgba(255,100,100,0.1)',
      border: 'rgba(255,100,100,0.25)',
      message: pillar.feedbackImprove,
    },
  }

  const config = levelConfig[level]

  const radarSlices = PILLARS.map(p => {
    const completed = completedPillarScores.find(c => c.name === p.name)
    return completed ?? { name: p.name, displayName: p.displayName, emoji: p.emoji, color: p.radarColor, weight: p.weight, score: 0 }
  })

  const nextLabel = isLastPillar
    ? 'Ver meu Health Score parcial →'
    : `Próximo: ${PILLARS[PILLARS.findIndex(p => p.name === pillar.name) + 1]?.displayName ?? 'Continuar'} →`

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12"
      style={{
        background: 'radial-gradient(circle at top right, rgba(47,111,110,0.4), transparent 50%), linear-gradient(160deg, #0D2B2B 0%, #0f3333 60%, #164646 100%)',
      }}
    >
      <div
        className="w-full max-w-sm flex flex-col items-center gap-6 text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}
      >
        {/* Radar atualizado */}
        <div className="relative">
          <RadarChart slices={radarSlices} size={200} animated />
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ pointerEvents: 'none' }}
          >
            <div
              className="px-3 py-1.5 rounded-full font-sora text-xs font-bold"
              style={{
                background: config.bg,
                border: `1px solid ${config.border}`,
                color: config.color,
                marginTop: '-12px',
              }}
            >
              {config.emoji} {pillar.displayName} {config.label}
            </div>
          </div>
        </div>

        {/* Feedback */}
        <div
          className="w-full rounded-2xl px-6 py-5"
          style={{
            background: config.bg,
            border: `1px solid ${config.border}`,
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{pillar.emoji}</span>
            <span className="font-sora font-bold text-white">{pillar.displayName} analisado</span>
            <span
              className="ml-auto font-sora font-bold text-xl"
              style={{ color: config.color }}
            >
              {pillarScore}
            </span>
          </div>
          <p className="font-inter text-sm text-left" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {config.message}
          </p>
        </div>

        {/* Next pillar hint */}
        {!isLastPillar && (
          <p className="font-inter text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Próximo pilar:{' '}
            <strong className="text-white">
              {PILLARS[PILLARS.findIndex(p => p.name === pillar.name) + 1]?.displayName}
            </strong>
          </p>
        )}

        {/* CTA */}
        <button
          onClick={onNext}
          className="w-full font-sora font-bold text-petroleum rounded-full py-4 transition-all duration-200 hover:-translate-y-1 active:scale-95"
          style={{
            background: '#D7E94A',
            boxShadow: '0 12px 32px rgba(215,233,74,0.3)',
          }}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  )
}

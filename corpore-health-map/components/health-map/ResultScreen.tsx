'use client'

import { useEffect, useState } from 'react'
import type { HealthMapResult } from '@/lib/health-map/types'
import { ScoreRing } from './ScoreRing'

interface ResultScreenProps {
  result: HealthMapResult
  firstName?: string
}

export default function ResultScreen({ result, firstName }: ResultScreenProps) {
  const [section, setSection] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  const scoreColor =
    result.healthScore >= 80
      ? '#D7E94A'
      : result.healthScore >= 60
      ? '#7BC96F'
      : result.healthScore >= 40
      ? '#FFC85E'
      : '#ff8a8a'

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'radial-gradient(circle at top right, rgba(47,111,110,0.4), transparent 50%), linear-gradient(160deg, #0D2B2B 0%, #0f3333 60%, #164646 100%)',
      }}
    >
      <div
        className="max-w-lg mx-auto px-6 py-10 flex flex-col gap-8"
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.7s ease',
        }}
      >
        {/* HEADER */}
        <div className="text-center">
          <span className="text-xs font-sora font-semibold tracking-widest uppercase" style={{ color: '#D7E94A' }}>
            SEU HEALTH MAP
          </span>
          <h1
            className="mt-2 font-sora font-bold text-white"
            style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', letterSpacing: '-0.02em' }}
          >
            {firstName ? `Parabéns, ${firstName}! Você completou seu Health Map 🎉` : 'Parabéns! Você completou seu Health Map 🎉'}
          </h1>
          <p
            className="mt-2 font-inter text-sm leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            Enviamos seu resultado completo no WhatsApp cadastrado. Dá uma olhada por lá!
          </p>
        </div>

        {/* PERFIL COMPORTAMENTAL — primeiro */}
        <div
          className="rounded-2xl p-6"
          style={{
            background: 'rgba(215,233,74,0.08)',
            border: '1.5px solid rgba(215,233,74,0.25)',
          }}
        >
          <div className="flex items-start gap-3 mb-3">
            <span className="text-4xl">{result.profile.emoji}</span>
            <div>
              <p className="font-inter text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Seu perfil de saúde
              </p>
              <h2
                className="font-sora font-bold text-white"
                style={{ fontSize: '1.2rem', letterSpacing: '-0.02em' }}
              >
                {result.profile.name}
              </h2>
              <p className="font-inter text-sm mt-0.5" style={{ color: '#D7E94A' }}>
                {result.profile.tagline}
              </p>
            </div>
          </div>
          <p className="font-inter text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {result.profile.description}
          </p>
        </div>

        {/* HEALTH SCORE */}
        <div
          className="rounded-2xl p-6 flex flex-col items-center gap-4"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <p className="font-inter text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Seu Health Score
          </p>
          <ScoreRing score={result.healthScore} size={180} />
          <div className="text-center">
            <p
              className="font-sora font-bold"
              style={{ color: scoreColor, fontSize: '1rem' }}
            >
              {result.healthScoreClass}
            </p>
            <p className="font-inter text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Baseado nos 6 pilares da Medicina do Estilo de Vida
            </p>
          </div>
        </div>

        {/* CTA final */}
        <div className="flex flex-col gap-3 pb-8">
          <a
            href="https://www.instagram.com/corporesjc"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center font-inter text-sm py-3 rounded-full transition-all duration-200 hover:opacity-80"
            style={{
              color: 'rgba(255,255,255,0.5)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            Conhecer a Corpore
          </a>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import RadarChart from './RadarChart'

interface WelcomeScreenProps {
  onStart: () => void
}

const PILLARS_LIST = [
  { emoji: '🏃', label: 'Movimento' },
  { emoji: '🥗', label: 'Alimentação' },
  { emoji: '😴', label: 'Sono' },
  { emoji: '🧠', label: 'Estresse' },
  { emoji: '🤝', label: 'Relacionamentos' },
  { emoji: '🛡️', label: 'Hábitos de Saúde' },
]

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [visible, setVisible] = useState(false)
  const [radarPulse, setRadarPulse] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 100)
    const t2 = setTimeout(() => setRadarPulse(true), 800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12"
      style={{
        background: 'radial-gradient(circle at top right, rgba(47,111,110,0.4), transparent 50%), linear-gradient(160deg, #0D2B2B 0%, #0f3333 60%, #164646 100%)',
      }}
    >
      <div
        className="w-full max-w-lg flex flex-col items-center gap-8 text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        {/* Logo / brand */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-sora font-semibold tracking-widest uppercase" style={{ color: '#D7E94A' }}>
            CORPORE
          </span>
          <div className="w-px h-4" style={{ background: 'rgba(215,233,74,0.3)' }} />
          <span className="text-xs font-sora font-semibold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.5)' }}>
            HEALTH MAP
          </span>
        </div>

        {/* Radar vazio pulsante */}
        <div
          style={{
            opacity: radarPulse ? 1 : 0,
            transform: radarPulse ? 'scale(1)' : 'scale(0.9)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <RadarChart slices={[]} size={220} empty animated />
        </div>

        {/* Headline */}
        <div className="flex flex-col gap-4">
          <h1
            className="font-sora font-bold text-white"
            style={{ fontSize: 'clamp(1.6rem, 5vw, 2.4rem)', lineHeight: 1.15, letterSpacing: '-0.025em' }}
          >
            Seu Corpo Está Tentando<br />
            <span style={{ color: '#D7E94A' }}>Te Dizer Alguma Coisa?</span>
          </h1>
          <p className="font-inter text-white/70 leading-relaxed" style={{ fontSize: '1rem' }}>
            Em menos de 3 minutos vamos mapear sua saúde e revelar seu{' '}
            <strong className="text-white">Health Score</strong>.
          </p>
        </div>

        {/* Pilares */}
        <div className="w-full grid grid-cols-2 gap-2">
          {PILLARS_LIST.map((p, i) => (
            <div
              key={p.label}
              className="flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(8px)',
                transition: `opacity 0.5s ease ${0.3 + i * 0.08}s, transform 0.5s ease ${0.3 + i * 0.08}s`,
              }}
            >
              <span className="text-lg">{p.emoji}</span>
              <span className="font-inter text-sm text-white/80">{p.label}</span>
              <span className="ml-auto text-xs" style={{ color: '#D7E94A' }}>✓</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={onStart}
          className="w-full font-sora font-bold text-petroleum rounded-full py-4 px-8 transition-all duration-200 hover:-translate-y-1 active:scale-95"
          style={{
            background: '#D7E94A',
            boxShadow: '0 12px 32px rgba(215,233,74,0.35)',
            fontSize: '1rem',
            letterSpacing: '-0.01em',
          }}
        >
          🚀 Começar Meu Health Map
        </button>

        <p className="text-xs font-inter" style={{ color: 'rgba(255,255,255,0.35)' }}>
          Gratuito • 100% online • Resultado personalizado
        </p>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import RadarChart from './RadarChart'

interface AnalyzingScreenProps {
  pillarScores: { name: string; score: number; color: string; emoji: string; displayName: string; weight: number }[]
  onDone: () => void
  isCalculating?: boolean
}

const ANALYZING_MESSAGES = [
  'Comparando seus hábitos com milhares de perfis de saúde...',
  'Identificando padrões nos seus pilares...',
  'Calculando seu Health Score...',
  'Mapeando seu potencial de transformação...',
  'Preparando seus insights personalizados...',
]

const CALCULATING_MESSAGES = [
  'Gerando seu relatório personalizado...',
  'Identificando sua principal oportunidade...',
  'Calculando seu potencial de melhora...',
  'Quase pronto...',
]

export default function AnalyzingScreen({ pillarScores, onDone, isCalculating = false }: AnalyzingScreenProps) {
  const [msgIndex, setMsgIndex] = useState(0)
  const [visible, setVisible] = useState(false)

  const messages = isCalculating ? CALCULATING_MESSAGES : ANALYZING_MESSAGES
  const duration = isCalculating ? 3500 : 5000

  useEffect(() => {
    setVisible(true)
    const interval = setInterval(() => {
      setMsgIndex(i => (i + 1) % messages.length)
    }, 900)

    const timer = setTimeout(() => {
      clearInterval(interval)
      onDone()
    }, duration)

    return () => { clearInterval(interval); clearTimeout(timer) }
  }, [])

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{
        background: 'radial-gradient(circle at top right, rgba(47,111,110,0.4), transparent 50%), linear-gradient(160deg, #0D2B2B 0%, #0f3333 60%, #164646 100%)',
      }}
    >
      <div
        className="flex flex-col items-center gap-8 text-center max-w-sm"
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
      >
        {/* Radar animado */}
        <div
          style={{
            animation: 'spin-slow 8s linear infinite',
          }}
        >
          <RadarChart slices={pillarScores} size={220} animated />
        </div>

        {/* Spinner */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-1.5">
            {[0, 1, 2, 3].map(i => (
              <div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{
                  background: '#D7E94A',
                  animation: `pulse-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            ))}
          </div>

          <p
            className="font-inter text-sm"
            style={{
              color: 'rgba(255,255,255,0.7)',
              minHeight: '2.5rem',
              transition: 'opacity 0.3s ease',
            }}
          >
            {messages[msgIndex]}
          </p>
        </div>

        <h3
          className="font-sora font-bold text-white"
          style={{ fontSize: '1.2rem', letterSpacing: '-0.02em' }}
        >
          {isCalculating ? 'Gerando seu resultado...' : 'Analisando seu Health Map...'}
        </h3>
      </div>

      <style jsx>{`
        @keyframes pulse-dot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

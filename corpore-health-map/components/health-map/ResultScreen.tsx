'use client'

import { useEffect, useRef, useState } from 'react'
import type { HealthMapResult } from '@/lib/health-map/types'
import RadarChart from './RadarChart'

interface ResultScreenProps {
  result: HealthMapResult
  firstName?: string
}

function AnimatedScore({ target, duration = 1800 }: { target: number; duration?: number }) {
  const [current, setCurrent] = useState(0)
  const frame = useRef<number>(0)

  useEffect(() => {
    const start = performance.now()
    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrent(Math.round(eased * target))
      if (progress < 1) frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame.current)
  }, [target, duration])

  return <>{current}</>
}

function ScoreRing({ score, size = 160 }: { score: number; size?: number }) {
  const radius = size * 0.38
  const circumference = 2 * Math.PI * radius
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 300)
    return () => clearTimeout(t)
  }, [])

  const offset = circumference - (animated ? score / 100 : 0) * circumference

  const color =
    score >= 80 ? '#D7E94A' : score >= 60 ? '#7BC96F' : score >= 40 ? '#FFC85E' : '#ff8a8a'

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="10"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.8s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span
          className="font-sora font-bold"
          style={{ fontSize: size * 0.26, color, lineHeight: 1 }}
        >
          <AnimatedScore target={score} />
        </span>
        <span className="font-inter text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
          /100
        </span>
      </div>
    </div>
  )
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

  const radarSlices = result.pillarScores.map(p => ({
    name: p.name,
    score: p.score,
    color: p.color,
    emoji: p.emoji,
    displayName: p.displayName,
    weight: p.weight,
  }))

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
            {firstName ? `${firstName}, aqui está um resumo do seu Health Map` : 'Aqui está um resumo do seu Health Map'}
          </h1>
          <p
            className="mt-2 font-inter text-sm leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            Acabamos de enviar no seu WhatsApp o relatório mais detalhado e um presente especial da Corpore por ter chegado até aqui!
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

        {/* RADAR DOS PILARES */}
        <div
          className="rounded-2xl p-6 flex flex-col items-center gap-4"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <p className="font-inter text-xs uppercase tracking-widest self-start" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Radar dos Pilares
          </p>
          <RadarChart slices={radarSlices} size={260} animated />
        </div>

        {/* PILARES INDIVIDUAIS */}
        <div className="flex flex-col gap-3">
          <p className="font-inter text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Análise por Pilar
          </p>
          {result.pillarScores.map(pillar => {
            const barColor =
              pillar.score >= 70 ? '#D7E94A' : pillar.score >= 45 ? '#FFC85E' : '#ff8a8a'
            const statusLabel =
              pillar.score >= 70 ? '🟢 Forte' : pillar.score >= 45 ? '🟡 Atenção' : '🔴 Prioridade'
            return (
              <div
                key={pillar.name}
                className="flex items-center gap-3 rounded-xl px-4 py-3"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <span className="text-xl flex-shrink-0">{pillar.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-sora text-sm font-semibold text-white">{pillar.displayName}</span>
                    <span className="font-sora text-sm font-bold ml-2" style={{ color: barColor, flexShrink: 0 }}>
                      {pillar.score}
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${pillar.score}%`,
                        background: barColor,
                        transition: 'width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      }}
                    />
                  </div>
                </div>
                <span className="text-xs flex-shrink-0" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {statusLabel}
                </span>
              </div>
            )
          })}
        </div>

        {/* O QUE PROTEGE E O QUE REDUZ */}
        <div className="grid grid-cols-2 gap-3">
          <div
            className="rounded-xl p-4"
            style={{ background: 'rgba(215,233,74,0.08)', border: '1px solid rgba(215,233,74,0.2)' }}
          >
            <p className="font-inter text-xs mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Sua maior força
            </p>
            <p className="text-xl mb-1">{result.strongestPillar.emoji}</p>
            <p className="font-sora font-bold text-white text-sm">{result.strongestPillar.displayName}</p>
            <p className="font-sora font-bold mt-1" style={{ color: '#D7E94A' }}>
              +{result.strongestPillar.score} pts
            </p>
          </div>
          <div
            className="rounded-xl p-4"
            style={{ background: 'rgba(255,100,100,0.08)', border: '1px solid rgba(255,100,100,0.2)' }}
          >
            <p className="font-inter text-xs mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Principal gargalo
            </p>
            <p className="text-xl mb-1">{result.weakestPillar.emoji}</p>
            <p className="font-sora font-bold text-white text-sm">{result.weakestPillar.displayName}</p>
            <p className="font-sora font-bold mt-1" style={{ color: '#ff8a8a' }}>
              -{Math.round((100 - result.weakestPillar.score) * result.weakestPillar.weight)} pts
            </p>
          </div>
        </div>

        {/* PRÓXIMA MISSÃO — destaque máximo */}
        <div
          className="rounded-2xl p-6"
          style={{
            background: 'linear-gradient(135deg, rgba(47,111,110,0.3), rgba(13,43,43,0.8))',
            border: '1.5px solid rgba(47,111,110,0.5)',
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🎯</span>
            <p className="font-sora font-bold text-white">Sua Próxima Missão</p>
          </div>
          <p className="font-inter text-sm mb-3" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Se você focar em <strong className="text-white">{result.priorityPillar.displayName}</strong> agora, seu Health Score pode subir de:
          </p>
          <div className="flex items-center gap-3 mb-3">
            <span
              className="font-sora font-bold text-3xl"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              {result.healthScore}
            </span>
            <span className="text-2xl">→</span>
            <span className="font-sora font-bold text-3xl" style={{ color: '#D7E94A' }}>
              {result.potentialScore}
            </span>
            <span className="font-sora font-bold text-lg" style={{ color: '#D7E94A' }}>
              🔥 +{result.potentialScore - result.healthScore} pontos
            </span>
          </div>
          <p className="font-inter text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Isso é mais impactante do que qualquer outro pilar neste momento.
          </p>
        </div>

        {/* IPM */}
        <div
          className="rounded-2xl p-6"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-inter text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Índice de Prontidão para Mudança
              </p>
              <p className="font-sora font-bold text-white mt-1">{result.ipmClass}</p>
            </div>
            <div className="text-right">
              <span className="font-sora font-bold text-3xl" style={{ color: '#D7E94A' }}>
                {result.ipm}
              </span>
              <span className="font-inter text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>/100</span>
            </div>
          </div>
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${result.ipm}%`,
                background: 'linear-gradient(90deg, #2F6F6E, #D7E94A)',
                transition: 'width 1.5s ease',
              }}
            />
          </div>
        </div>

        {/* CONQUISTA */}
        <div
          className="rounded-2xl p-5 flex items-center gap-4"
          style={{
            background: 'linear-gradient(135deg, rgba(215,233,74,0.12), rgba(47,111,110,0.2))',
            border: '1.5px solid rgba(215,233,74,0.3)',
          }}
        >
          <div className="text-4xl">🏅</div>
          <div>
            <p className="font-inter text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Conquista desbloqueada
            </p>
            <p className="font-sora font-bold text-white">Explorador da Saúde</p>
            <p className="font-inter text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Você completou seu primeiro Health Map. Isso é o primeiro passo.
            </p>
          </div>
        </div>

        {/* IMC se disponível */}
        {result.imc && (
          <div
            className="rounded-xl px-5 py-4 flex items-center justify-between"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div>
              <p className="font-inter text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>IMC calculado</p>
              <p className="font-sora font-bold text-white">{result.imcClass}</p>
            </div>
            <span className="font-sora font-bold text-2xl" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {result.imc}
            </span>
          </div>
        )}

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

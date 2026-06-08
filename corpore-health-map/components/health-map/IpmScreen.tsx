'use client'

import { useEffect, useState } from 'react'
import type { IpmAnswers } from '@/lib/health-map/types'
import { IPM_OBSTACLES, IPM_FUTURE_OPTIONS, IPM_MENTAL_OPTIONS } from '@/lib/health-map/questions'

type IpmStep = 'readiness' | 'obstacle' | 'confidence' | 'future_mental'

interface IpmScreenProps {
  currentStep: IpmStep
  answers: Partial<IpmAnswers>
  onChange: (answers: Partial<IpmAnswers>) => void
  onNext: () => void
}

function SliderInput({
  value,
  onChange,
  label,
  leftLabel,
  rightLabel,
}: {
  value: number
  onChange: (v: number) => void
  label: string
  leftLabel: string
  rightLabel: string
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="font-inter text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{leftLabel}</span>
        <span
          className="font-sora font-bold text-4xl"
          style={{ color: '#D7E94A' }}
        >
          {value}
        </span>
        <span className="font-inter text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{rightLabel}</span>
      </div>
      <input
        type="range"
        min={0}
        max={10}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #D7E94A ${value * 10}%, rgba(255,255,255,0.15) ${value * 10}%)`,
          outline: 'none',
        }}
      />
      <div className="flex justify-between">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
          <span key={n} className="text-xs font-inter" style={{ color: 'rgba(255,255,255,0.25)' }}>
            {n}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function IpmScreen({ currentStep, answers, onChange, onNext }: IpmScreenProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(false)
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [currentStep])

  const containerStyle: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(16px)',
    transition: 'opacity 0.5s ease, transform 0.5s ease',
  }

  const canProceed = (() => {
    if (currentStep === 'readiness') return answers.readiness !== undefined
    if (currentStep === 'obstacle') return !!answers.obstacle
    if (currentStep === 'confidence') return answers.confidence !== undefined
    if (currentStep === 'future_mental') return !!answers.future && !!answers.mentalFatigue
    return false
  })()

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12"
      style={{
        background: 'radial-gradient(circle at top right, rgba(47,111,110,0.4), transparent 50%), linear-gradient(160deg, #0D2B2B 0%, #0f3333 60%, #164646 100%)',
      }}
    >
      <div className="w-full max-w-md flex flex-col gap-8" style={containerStyle}>

        {/* Intro header */}
        <div className="text-center">
          <span className="text-xs font-sora font-semibold tracking-widest uppercase" style={{ color: '#D7E94A' }}>
            ANTES DE VER SEU RESULTADO
          </span>
          <h2
            className="mt-2 font-sora font-bold text-white"
            style={{ fontSize: 'clamp(1.2rem, 4vw, 1.6rem)', letterSpacing: '-0.02em', lineHeight: 1.3 }}
          >
            {currentStep === 'readiness' && 'Você está preparado para mudar?'}
            {currentStep === 'obstacle' && 'Qual é seu maior desafio hoje?'}
            {currentStep === 'confidence' && 'Quanto você acredita em si mesmo?'}
            {currentStep === 'future_mental' && 'Duas últimas perguntas...'}
          </h2>
          {(currentStep === 'readiness' || currentStep === 'confidence') && (
            <p className="mt-1 font-inter text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Arraste o dedo para selecionar sua resposta
            </p>
          )}
        </div>

        {/* READINESS */}
        {currentStep === 'readiness' && (
          <div
            className="rounded-2xl p-6"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <p className="font-inter text-white/80 mb-6 text-center text-sm leading-relaxed">
              Em uma escala de 0 a 10, quão preparado você está para fazer mudanças na sua saúde nos próximos 30 dias?
            </p>
            <SliderInput
              value={answers.readiness ?? 5}
              onChange={v => onChange({ ...answers, readiness: v })}
              label="Prontidão"
              leftLabel="Nada preparado"
              rightLabel="Totalmente pronto"
            />
          </div>
        )}

        {/* OBSTACLE */}
        {currentStep === 'obstacle' && (
          <div className="grid grid-cols-3 gap-2">
            {IPM_OBSTACLES.map(obs => (
              <button
                key={obs.value}
                onClick={() => onChange({ ...answers, obstacle: obs.value })}
                className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: answers.obstacle === obs.value ? 'rgba(215,233,74,0.15)' : 'rgba(255,255,255,0.06)',
                  border: answers.obstacle === obs.value ? '1.5px solid #D7E94A' : '1px solid rgba(255,255,255,0.1)',
                  color: answers.obstacle === obs.value ? '#D7E94A' : 'rgba(255,255,255,0.75)',
                }}
              >
                <span className="text-2xl">{obs.emoji}</span>
                <span className="font-inter text-xs text-center leading-tight">{obs.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* CONFIDENCE */}
        {currentStep === 'confidence' && (
          <div
            className="rounded-2xl p-6"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <p className="font-inter text-white/80 mb-6 text-center text-sm leading-relaxed">
              Em uma escala de 0 a 10, quão confiante você se sente para melhorar sua saúde nos próximos meses?
            </p>
            <SliderInput
              value={answers.confidence ?? 5}
              onChange={v => onChange({ ...answers, confidence: v })}
              label="Confiança"
              leftLabel="Nada confiante"
              rightLabel="Muito confiante"
            />
          </div>
        )}

        {/* FUTURE + MENTAL FATIGUE */}
        {currentStep === 'future_mental' && (
          <div className="flex flex-col gap-5">
            <div>
              <p className="font-inter text-white/80 mb-3 text-sm leading-relaxed">
                Você acredita que sua saúde será melhor, igual ou pior daqui a 10 anos se continuar exatamente como vive hoje?
              </p>
              <div className="flex flex-col gap-2">
                {IPM_FUTURE_OPTIONS.map(opt => (
                  <button
                    key={opt.label}
                    onClick={() => onChange({ ...answers, future: opt.label })}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl font-inter text-sm transition-all duration-200"
                    style={{
                      background: answers.future === opt.label ? 'rgba(215,233,74,0.12)' : 'rgba(255,255,255,0.05)',
                      border: answers.future === opt.label ? '1.5px solid #D7E94A' : '1px solid rgba(255,255,255,0.08)',
                      color: answers.future === opt.label ? '#D7E94A' : 'rgba(255,255,255,0.8)',
                    }}
                  >
                    <span>{opt.emoji}</span>
                    <span>{opt.label}</span>
                    {answers.future === opt.label && <span className="ml-auto">✓</span>}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="font-inter text-white/80 mb-3 text-sm leading-relaxed">
                Com que frequência sente sua mente cansada ao longo do dia?
              </p>
              <div className="flex flex-col gap-2">
                {IPM_MENTAL_OPTIONS.map(opt => (
                  <button
                    key={opt.label}
                    onClick={() => onChange({ ...answers, mentalFatigue: opt.label })}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl font-inter text-sm transition-all duration-200"
                    style={{
                      background: answers.mentalFatigue === opt.label ? 'rgba(215,233,74,0.12)' : 'rgba(255,255,255,0.05)',
                      border: answers.mentalFatigue === opt.label ? '1.5px solid #D7E94A' : '1px solid rgba(255,255,255,0.08)',
                      color: answers.mentalFatigue === opt.label ? '#D7E94A' : 'rgba(255,255,255,0.8)',
                    }}
                  >
                    <span>{opt.emoji}</span>
                    <span>{opt.label}</span>
                    {answers.mentalFatigue === opt.label && <span className="ml-auto">✓</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="w-full font-sora font-bold rounded-full py-4 transition-all duration-200 hover:-translate-y-1 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          style={{
            background: canProceed ? '#D7E94A' : 'rgba(215,233,74,0.3)',
            color: canProceed ? '#0D2B2B' : 'rgba(255,255,255,0.5)',
            boxShadow: canProceed ? '0 12px 32px rgba(215,233,74,0.3)' : 'none',
          }}
        >
          {currentStep === 'future_mental' ? 'Ver Meu Resultado →' : 'Continuar →'}
        </button>
      </div>
    </div>
  )
}

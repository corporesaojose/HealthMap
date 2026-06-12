'use client'

import { useState } from 'react'
import type { ActivityLevel, RegistrationData } from '@/lib/health-map/types'

interface RegistrationScreenProps {
  data: RegistrationData
  onChange: (data: RegistrationData) => void
  onNext: () => void
}

const ACTIVITY_OPTIONS: { value: ActivityLevel; label: string; emoji: string }[] = [
  { value: 'sedentario', label: 'Estou sedentário', emoji: '🛋️' },
  { value: 'caminhada_corrida', label: 'Faço caminhadas/corrida', emoji: '🏃' },
  { value: 'esportes', label: 'Pratico esportes', emoji: '⚽' },
  { value: 'academia', label: 'Faço academia', emoji: '🏋️' },
  { value: 'pilates_crossfit_spinning_bootcamp', label: 'Faço Pilates, Crossfit, Spinning, Bootcamp e similares', emoji: '🤸' },
]

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return digits
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

export default function RegistrationScreen({ data, onChange, onNext }: RegistrationScreenProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  function update(field: keyof RegistrationData, value: string | ActivityLevel | null) {
    onChange({ ...data, [field]: value })
    if (errors[field]) setErrors(e => ({ ...e, [field]: '' }))
  }

  function validate() {
    const e: Record<string, string> = {}
    if (!data.name || data.name.trim().length < 3) e.name = 'Informe seu nome completo'
    const phoneDigits = data.phone.replace(/\D/g, '')
    if (phoneDigits.length < 10) e.phone = 'Informe um telefone válido'
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Informe um e-mail válido'
    if (!data.neighborhood || data.neighborhood.trim().length < 2) e.neighborhood = 'Informe seu bairro'
    if (!data.activityLevel) e.activityLevel = 'Selecione uma opção'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleNext() {
    if (!validate()) return
    setLoading(true)
    onNext()
  }

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '0.75rem',
    color: 'white',
    padding: '12px 16px',
    fontSize: '1rem',
    fontFamily: 'var(--font-inter), sans-serif',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12"
      style={{
        background: 'radial-gradient(circle at top right, rgba(47,111,110,0.4), transparent 50%), linear-gradient(160deg, #0D2B2B 0%, #0f3333 60%, #164646 100%)',
      }}
    >
      <div className="w-full max-w-md flex flex-col gap-6">
        {/* Header */}
        <div className="text-center">
          <span className="text-xs font-sora font-semibold tracking-widest uppercase" style={{ color: '#D7E94A' }}>
            ÚLTIMO PASSO
          </span>
          <h2
            className="mt-2 font-sora font-bold text-white"
            style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', letterSpacing: '-0.02em' }}
          >
            Seu resultado está pronto! 🎉
          </h2>
          <p className="mt-1 font-inter text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Preencha seus dados para visualizar seu Health Score completo.
          </p>
        </div>

        {/* Nome */}
        <div className="flex flex-col gap-2">
          <label className="font-sora text-sm font-semibold text-white/70">Nome completo</label>
          <input
            type="text"
            placeholder="Ex: Maria Silva"
            value={data.name}
            onChange={e => update('name', e.target.value)}
            style={{
              ...inputStyle,
              borderColor: errors.name ? '#ff6b6b' : 'rgba(255,255,255,0.15)',
            }}
          />
          {errors.name && <p className="text-xs" style={{ color: '#ff6b6b' }}>{errors.name}</p>}
        </div>

        {/* Telefone */}
        <div className="flex flex-col gap-2">
          <label className="font-sora text-sm font-semibold text-white/70">Telefone (WhatsApp)</label>
          <input
            type="tel"
            inputMode="numeric"
            placeholder="(00) 00000-0000"
            value={data.phone}
            onChange={e => update('phone', formatPhone(e.target.value))}
            style={{
              ...inputStyle,
              borderColor: errors.phone ? '#ff6b6b' : 'rgba(255,255,255,0.15)',
            }}
          />
          {errors.phone && <p className="text-xs" style={{ color: '#ff6b6b' }}>{errors.phone}</p>}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label className="font-sora text-sm font-semibold text-white/70">E-mail</label>
          <input
            type="email"
            placeholder="Ex: maria@email.com"
            value={data.email}
            onChange={e => update('email', e.target.value)}
            style={{
              ...inputStyle,
              borderColor: errors.email ? '#ff6b6b' : 'rgba(255,255,255,0.15)',
            }}
          />
          {errors.email && <p className="text-xs" style={{ color: '#ff6b6b' }}>{errors.email}</p>}
        </div>

        {/* Bairro */}
        <div className="flex flex-col gap-2">
          <label className="font-sora text-sm font-semibold text-white/70">Bairro</label>
          <input
            type="text"
            placeholder="Ex: Centro"
            value={data.neighborhood}
            onChange={e => update('neighborhood', e.target.value)}
            style={{
              ...inputStyle,
              borderColor: errors.neighborhood ? '#ff6b6b' : 'rgba(255,255,255,0.15)',
            }}
          />
          {errors.neighborhood && <p className="text-xs" style={{ color: '#ff6b6b' }}>{errors.neighborhood}</p>}
        </div>

        {/* Atividade física */}
        <div className="flex flex-col gap-2">
          <label className="font-sora text-sm font-semibold text-white/70">Você já pratica atividade física?</label>
          <div className="flex flex-col gap-2">
            {ACTIVITY_OPTIONS.map(opt => {
              const isSelected = data.activityLevel === opt.value
              return (
                <button
                  key={opt.value}
                  onClick={() => update('activityLevel', opt.value)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl font-inter text-sm text-left transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: isSelected ? 'rgba(215,233,74,0.15)' : 'rgba(255,255,255,0.06)',
                    border: isSelected ? '1.5px solid #D7E94A' : '1px solid rgba(255,255,255,0.12)',
                    color: isSelected ? '#D7E94A' : 'rgba(255,255,255,0.8)',
                  }}
                >
                  <span className="text-xl flex-shrink-0">{opt.emoji}</span>
                  <span className="font-medium">{opt.label}</span>
                  {isSelected && <span className="ml-auto" style={{ color: '#D7E94A' }}>✓</span>}
                </button>
              )
            })}
          </div>
          {errors.activityLevel && <p className="text-xs" style={{ color: '#ff6b6b' }}>{errors.activityLevel}</p>}
        </div>

        {/* CTA */}
        <button
          onClick={handleNext}
          disabled={loading}
          className="w-full font-sora font-bold text-petroleum rounded-full py-4 px-8 transition-all duration-200 hover:-translate-y-1 active:scale-95 mt-2 disabled:opacity-70"
          style={{
            background: '#D7E94A',
            boxShadow: '0 12px 32px rgba(215,233,74,0.35)',
            fontSize: '1rem',
          }}
        >
          {loading ? 'Carregando...' : 'Ver meu Health Score →'}
        </button>

        <p className="text-center text-xs font-inter" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Seus dados são confidenciais e usados apenas para personalizar seu acompanhamento.
        </p>
      </div>
    </div>
  )
}

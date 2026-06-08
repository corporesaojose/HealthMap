'use client'

import { useState } from 'react'
import type { PersonalData, Sex } from '@/lib/health-map/types'

interface PersonalDataScreenProps {
  data: PersonalData
  onChange: (data: PersonalData) => void
  onNext: () => void
}

const SEX_OPTIONS: { value: Sex; label: string; emoji: string }[] = [
  { value: 'masculino', label: 'Masculino', emoji: '♂️' },
  { value: 'feminino', label: 'Feminino', emoji: '♀️' },
  { value: 'nao_informar', label: 'Prefiro não informar', emoji: '—' },
]

export default function PersonalDataScreen({ data, onChange, onNext }: PersonalDataScreenProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  function update(field: keyof PersonalData, value: string | Sex | null) {
    onChange({ ...data, [field]: value })
    if (errors[field]) setErrors(e => ({ ...e, [field]: '' }))
  }

  function validate() {
    const e: Record<string, string> = {}
    if (!data.sex) e.sex = 'Selecione uma opção'
    if (!data.age || isNaN(Number(data.age)) || Number(data.age) < 10 || Number(data.age) > 110)
      e.age = 'Informe uma idade válida'
    if (!data.weight || isNaN(Number(data.weight)) || Number(data.weight) < 20 || Number(data.weight) > 300)
      e.weight = 'Informe um peso válido (kg)'
    if (!data.height || isNaN(Number(data.height)) || Number(data.height) < 100 || Number(data.height) > 250)
      e.height = 'Informe uma altura válida (cm)'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleNext() {
    if (validate()) onNext()
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
            ANTES DE COMEÇAR
          </span>
          <h2
            className="mt-2 font-sora font-bold text-white"
            style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', letterSpacing: '-0.02em' }}
          >
            Nos conte um pouco sobre você
          </h2>
          <p className="mt-1 font-inter text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Esses dados tornam seu resultado mais preciso.
          </p>
        </div>

        {/* Sexo */}
        <div className="flex flex-col gap-2">
          <label className="font-sora text-sm font-semibold text-white/70">Sexo biológico</label>
          <div className="grid grid-cols-3 gap-2">
            {SEX_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => update('sex', opt.value)}
                className="flex flex-col items-center gap-1 py-3 rounded-xl font-inter text-sm transition-all duration-200"
                style={{
                  background: data.sex === opt.value ? 'rgba(215,233,74,0.15)' : 'rgba(255,255,255,0.06)',
                  border: data.sex === opt.value ? '1.5px solid #D7E94A' : '1px solid rgba(255,255,255,0.12)',
                  color: data.sex === opt.value ? '#D7E94A' : 'rgba(255,255,255,0.7)',
                }}
              >
                <span className="text-xl">{opt.emoji}</span>
                <span className="text-xs text-center leading-tight">{opt.label}</span>
              </button>
            ))}
          </div>
          {errors.sex && <p className="text-xs" style={{ color: '#ff6b6b' }}>{errors.sex}</p>}
        </div>

        {/* Idade */}
        <div className="flex flex-col gap-2">
          <label className="font-sora text-sm font-semibold text-white/70">Idade</label>
          <input
            type="number"
            inputMode="numeric"
            placeholder="Ex: 35"
            value={data.age}
            onChange={e => update('age', e.target.value)}
            style={{
              ...inputStyle,
              borderColor: errors.age ? '#ff6b6b' : 'rgba(255,255,255,0.15)',
            }}
          />
          {errors.age && <p className="text-xs" style={{ color: '#ff6b6b' }}>{errors.age}</p>}
        </div>

        {/* Peso e Altura lado a lado */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-2">
            <label className="font-sora text-sm font-semibold text-white/70">Peso (kg)</label>
            <input
              type="number"
              inputMode="decimal"
              placeholder="Ex: 75"
              value={data.weight}
              onChange={e => update('weight', e.target.value)}
              style={{
                ...inputStyle,
                borderColor: errors.weight ? '#ff6b6b' : 'rgba(255,255,255,0.15)',
              }}
            />
            {errors.weight && <p className="text-xs" style={{ color: '#ff6b6b' }}>{errors.weight}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-sora text-sm font-semibold text-white/70">Altura (cm)</label>
            <input
              type="number"
              inputMode="numeric"
              placeholder="Ex: 170"
              value={data.height}
              onChange={e => update('height', e.target.value)}
              style={{
                ...inputStyle,
                borderColor: errors.height ? '#ff6b6b' : 'rgba(255,255,255,0.15)',
              }}
            />
            {errors.height && <p className="text-xs" style={{ color: '#ff6b6b' }}>{errors.height}</p>}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleNext}
          className="w-full font-sora font-bold text-petroleum rounded-full py-4 px-8 transition-all duration-200 hover:-translate-y-1 active:scale-95 mt-2"
          style={{
            background: '#D7E94A',
            boxShadow: '0 12px 32px rgba(215,233,74,0.35)',
            fontSize: '1rem',
          }}
        >
          Iniciar Mapeamento →
        </button>

        <p className="text-center text-xs font-inter" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Seus dados são usados apenas para personalizar seu resultado.
        </p>
      </div>
    </div>
  )
}

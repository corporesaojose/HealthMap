'use client'

import { useEffect, useRef } from 'react'

interface RadarSlice {
  name: string
  score: number
  color: string
  emoji: string
}

interface RadarChartProps {
  slices: RadarSlice[]
  size?: number
  animated?: boolean
  empty?: boolean
}

const LABELS = ['Movimento', 'Alimentação', 'Sono', 'Estresse', 'Relacionamentos', 'Hábitos']

export default function RadarChart({ slices, size = 280, animated = true, empty = false }: RadarChartProps) {
  const canvasRef = useRef<SVGSVGElement>(null)
  const N = 6
  const padding = 28
  const vbSize = size + padding * 2
  const cx = vbSize / 2
  const cy = vbSize / 2
  const R = size * 0.36
  const labelR = size * 0.48

  function getPoint(angle: number, r: number) {
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    }
  }

  function getPolygonPoints(scores: number[]) {
    return scores
      .map((score, i) => {
        const angle = (2 * Math.PI * i) / N - Math.PI / 2
        const r = (score / 100) * R
        const p = getPoint(angle, r)
        return `${p.x},${p.y}`
      })
      .join(' ')
  }

  const gridLevels = [20, 40, 60, 80, 100]

  const scores = empty
    ? Array(N).fill(0)
    : slices.map(s => s.score)

  const filledScores = Array(N).fill(0).map((_, i) => scores[i] ?? 0)

  return (
    <svg
      ref={canvasRef}
      width={size}
      height={size}
      viewBox={`0 0 ${vbSize} ${vbSize}`}
      aria-label="Radar de saúde"
    >
      {/* Grid rings */}
      {gridLevels.map(level => (
        <polygon
          key={level}
          points={Array(N)
            .fill(0)
            .map((_, i) => {
              const angle = (2 * Math.PI * i) / N - Math.PI / 2
              const r = (level / 100) * R
              const p = getPoint(angle, r)
              return `${p.x},${p.y}`
            })
            .join(' ')}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
        />
      ))}

      {/* Axis lines */}
      {Array(N)
        .fill(0)
        .map((_, i) => {
          const angle = (2 * Math.PI * i) / N - Math.PI / 2
          const p = getPoint(angle, R)
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={p.x}
              y2={p.y}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
          )
        })}

      {/* Filled area */}
      {!empty && (
        <>
          <polygon
            points={getPolygonPoints(filledScores)}
            fill="rgba(215,233,74,0.15)"
            stroke="#D7E94A"
            strokeWidth="2"
            strokeLinejoin="round"
            style={
              animated
                ? {
                    transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }
                : undefined
            }
          />
          {/* Data points */}
          {filledScores.map((score, i) => {
            if (score === 0) return null
            const angle = (2 * Math.PI * i) / N - Math.PI / 2
            const r = (score / 100) * R
            const p = getPoint(angle, r)
            return (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r="4"
                fill="#D7E94A"
                stroke="#0D2B2B"
                strokeWidth="1.5"
                style={animated ? { transition: 'all 0.8s ease' } : undefined}
              />
            )
          })}
        </>
      )}

      {/* Center dot */}
      <circle cx={cx} cy={cy} r="3" fill="rgba(255,255,255,0.2)" />

      {/* Labels */}
      {LABELS.map((label, i) => {
        const angle = (2 * Math.PI * i) / N - Math.PI / 2
        const p = getPoint(angle, labelR)
        const score = filledScores[i]
        const color = !empty && score > 0 ? (slices[i]?.color ?? '#D7E94A') : 'rgba(255,255,255,0.3)'

        return (
          <text
            key={i}
            x={p.x}
            y={p.y + 4}
            textAnchor="middle"
            fill={color}
            fontSize={size < 200 ? '9' : '11'}
            fontFamily="var(--font-sora), sans-serif"
            fontWeight="600"
          >
            {label}
          </text>
        )
      })}
    </svg>
  )
}

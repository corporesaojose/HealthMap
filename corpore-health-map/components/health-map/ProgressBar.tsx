'use client'

import { PILLARS } from '@/lib/health-map/questions'

interface ProgressBarProps {
  currentPillar: number
  totalPillars?: number
}

export default function ProgressBar({ currentPillar, totalPillars = 6 }: ProgressBarProps) {
  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between mb-2">
        <span
          className="text-xs font-sora font-semibold tracking-widest uppercase"
          style={{ color: '#D7E94A' }}
        >
          Etapa {currentPillar + 1} de {totalPillars}
        </span>
        <span className="text-xs font-inter" style={{ color: 'rgba(255,255,255,0.5)' }}>
          {PILLARS[currentPillar]?.displayName}
        </span>
      </div>
      <div
        className="w-full h-1.5 rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.1)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${((currentPillar + 1) / totalPillars) * 100}%`,
            background: 'linear-gradient(90deg, #2F6F6E, #D7E94A)',
          }}
        />
      </div>
      <div className="flex justify-between mt-2">
        {PILLARS.map((p, i) => (
          <div
            key={p.name}
            className="flex flex-col items-center gap-0.5"
            title={p.displayName}
          >
            <span
              className="text-base transition-all duration-300"
              style={{ opacity: i <= currentPillar ? 1 : 0.25 }}
            >
              {p.emoji}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

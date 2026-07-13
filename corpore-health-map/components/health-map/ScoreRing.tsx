'use client'

import { useEffect, useRef, useState } from 'react'

export function AnimatedScore({ target, duration = 1800 }: { target: number; duration?: number }) {
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

export function ScoreRing({ score, size = 160 }: { score: number; size?: number }) {
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

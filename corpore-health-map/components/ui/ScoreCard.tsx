"use client";
import { useEffect, useRef, useState } from "react";

export default function ScoreCard() {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const pillars = [
    { name: "Sono", score: 85, color: "#2F6F6E" },
    { name: "Energia", score: 78, color: "#D7E94A" },
    { name: "Estresse", score: 68, color: "#A6B8A9" },
    { name: "Alimentação", score: 82, color: "#2F6F6E" },
    { name: "Conexões", score: 75, color: "#D7E94A" },
    { name: "Movimento", score: 80, color: "#A6B8A9" },
  ];

  // SVG radar chart points
  const cx = 110, cy = 110, r = 80;
  const angles = pillars.map((_, i) => (i * 60 - 90) * (Math.PI / 180));
  const points = pillars.map((p, i) => {
    const ratio = p.score / 100;
    return {
      x: cx + r * ratio * Math.cos(angles[i]),
      y: cy + r * ratio * Math.sin(angles[i]),
    };
  });
  const gridPoints = (ratio: number) =>
    pillars.map((_, i) => ({
      x: cx + r * ratio * Math.cos(angles[i]),
      y: cy + r * ratio * Math.sin(angles[i]),
    }));
  const toPath = (pts: { x: number; y: number }[]) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ") + " Z";

  return (
    <div ref={ref} className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {/* Score circle card */}
      <div className="card-glass p-6 flex flex-col items-center gap-3">
        <span className="section-label">Score de Saúde</span>
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg width="144" height="144" viewBox="0 0 144 144" fill="none">
            <circle cx="72" cy="72" r="62" stroke="#E6E9E5" strokeWidth="10" fill="none" />
            <circle
              cx="72" cy="72" r="62"
              stroke="#D7E94A"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="389.6"
              strokeDashoffset={animated ? 389.6 * (1 - 0.82) : 389.6}
              transform="rotate(-90 72 72)"
              style={{ transition: "stroke-dashoffset 1.8s ease-out" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-sora font-bold text-4xl text-petroleum leading-none">82</span>
            <span className="text-xs text-teal font-semibold mt-1">Muito bom</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-sage">
          <span className="text-lime font-bold text-sm">↑ +12</span>
          <span>vs. anterior</span>
        </div>
      </div>

      {/* Radar card */}
      <div className="card-glass p-6 flex flex-col items-center gap-3">
        <span className="section-label">Radar de Pilares</span>
        <svg width="220" height="220" viewBox="0 0 220 220">
          {/* Grid rings */}
          {[0.25, 0.5, 0.75, 1].map((r) => (
            <polygon
              key={r}
              points={gridPoints(r).map((p) => `${p.x},${p.y}`).join(" ")}
              fill="none"
              stroke="#E6E9E5"
              strokeWidth="1"
            />
          ))}
          {/* Axis lines */}
          {angles.map((a, i) => (
            <line
              key={i}
              x1={cx} y1={cy}
              x2={cx + r * Math.cos(a)}
              y2={cy + r * Math.sin(a)}
              stroke="#E6E9E5"
              strokeWidth="1"
            />
          ))}
          {/* Data area */}
          <path
            d={toPath(animated ? points : gridPoints(0))}
            fill="rgba(47,111,110,0.2)"
            stroke="#2F6F6E"
            strokeWidth="2"
            style={{ transition: "d 1.4s ease-out" }}
          />
          {/* Labels */}
          {pillars.map((p, i) => {
            const lx = cx + (r + 18) * Math.cos(angles[i]);
            const ly = cy + (r + 18) * Math.sin(angles[i]);
            return (
              <text
                key={i}
                x={lx} y={ly}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="10"
                fontWeight="600"
                fill="#0D2B2B"
                fontFamily="Inter, sans-serif"
              >
                {p.name}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Pillars detail card */}
      <div className="card-glass p-6 lg:col-span-2">
        <span className="section-label block mb-4">Pilares do Health Map</span>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.name} className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-petroleum">{p.name}</span>
                <span className="text-xs font-bold" style={{ color: p.color === "#D7E94A" ? "#8a9a20" : p.color }}>
                  {p.score}
                </span>
              </div>
              <div className="pillar-bar">
                <div
                  className="pillar-bar-fill"
                  style={{ width: animated ? `${p.score}%` : "0%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.querySelectorAll(".reveal").forEach((el, i) => {
        setTimeout(() => el.classList.add("visible"), i * 120);
      });
    }
  }, []);

  const pillars = ["Sono", "Energia", "Estresse", "Alimentação", "Dores", "Pilares da saúde"];
  const trustCards = [
    { icon: "🔬", text: "Avaliação baseada em ciência" },
    { icon: "⚡", text: "Resultado rápido e personalizado" },
    { icon: "🔒", text: "Privacidade e segurança dos dados" },
  ];

  return (
    <section
      id="hero"
      ref={ref}
      aria-labelledby="hero-title"
      className="min-h-screen pt-24 pb-16 px-5 flex flex-col justify-center"
      style={{
        background:
          "radial-gradient(circle at top right, rgba(215,233,74,0.18), transparent 35%), linear-gradient(135deg, #F7F8F6 0%, #EAF1EE 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: text */}
          <div className="flex flex-col gap-6">
            <div className="reveal">
              <span className="section-label">AVALIAÇÃO DE SAÚDE ONLINE GRATUITA</span>
            </div>

            <h1
              id="hero-title"
              className="reveal font-sora font-bold text-petroleum leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)", letterSpacing: "-0.03em" }}
            >
              Seu corpo pode estar pedindo ajuda… mesmo que você ainda consiga{" "}
              <span className="text-lime" style={{ color: "#8a9a20" }}>"dar conta"</span>
            </h1>

            <p className="reveal text-petroleum/75 text-lg leading-relaxed max-w-lg">
              Faça uma avaliação de saúde online gratuita e descubra como estão seu sono, energia,
              estresse, alimentação, dores e os principais pilares do seu estilo de vida.
            </p>

            <ul className="reveal flex flex-wrap gap-2" aria-label="Pilares avaliados">
              {pillars.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-1.5 text-sm font-semibold text-petroleum bg-white/70 border border-mistgray rounded-full px-3 py-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-lime flex-shrink-0" style={{ backgroundColor: "#D7E94A" }} />
                  {p}
                </li>
              ))}
            </ul>

            <div className="reveal flex flex-col gap-3">
              <button
                type="button"
                className="btn-primary self-start animate-pulse-lime"
                aria-label="Fazer minha avaliação de saúde gratuitamente"
              >
                Fazer meu Health Map gratuitamente
              </button>
              <p className="text-xs text-sage font-semibold tracking-wide">
                Avaliação gratuita &nbsp;•&nbsp; 100% online &nbsp;•&nbsp; Resultado personalizado
              </p>
            </div>
          </div>

          {/* Right: visual mockup */}
          <div className="reveal flex justify-center lg:justify-end">
            <div className="relative animate-float">
              {/* Phone mockup */}
              <div
                className="relative w-64 rounded-3xl overflow-hidden shadow-2xl"
                style={{
                  background: "linear-gradient(135deg, #0D2B2B 0%, #2F6F6E 100%)",
                  padding: "3px",
                }}
              >
                <div className="rounded-3xl overflow-hidden bg-offwhite">
                  {/* Status bar */}
                  <div className="bg-petroleum h-8 flex items-center justify-between px-4">
                    <span className="text-xs text-white/60 font-semibold">9:41</span>
                    <div className="flex gap-1">
                      <span className="w-3 h-1.5 bg-white/40 rounded-full" />
                      <span className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                    </div>
                  </div>

                  <div className="p-4 flex flex-col gap-3">
                    {/* Header */}
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#D7E94A" }}>
                        <svg width="12" height="12" viewBox="0 0 100 100"><path d="M78 22C66 14 50 12 36 18C20 25 10 41 10 58C10 76 22 90 38 94C54 98 70 92 80 80C86 72 90 62 90 50C90 38 85 28 78 22ZM38 86C26 80 18 68 18 54C18 40 28 27 42 22C36 30 33 40 33 50C33 62 37 74 44 82C42 84 40 85 38 86Z" fill="#0D2B2B"/></svg>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-petroleum" style={{ fontSize: "9px", letterSpacing: "0.08em" }}>CORPORE</p>
                        <p className="font-semibold text-teal" style={{ fontSize: "8px", letterSpacing: "0.06em" }}>HEALTH MAP</p>
                      </div>
                    </div>

                    {/* Score circle */}
                    <div className="flex flex-col items-center py-3">
                      <div className="relative w-28 h-28 flex items-center justify-center">
                        <svg width="112" height="112" viewBox="0 0 112 112" fill="none">
                          <circle cx="56" cy="56" r="48" stroke="#E6E9E5" strokeWidth="8" fill="none" />
                          <circle
                            cx="56" cy="56" r="48"
                            stroke="#D7E94A"
                            strokeWidth="8"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray="301.6"
                            strokeDashoffset={301.6 * (1 - 0.82)}
                            transform="rotate(-90 56 56)"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="font-sora font-bold text-2xl text-petroleum">82</span>
                          <span className="text-teal font-semibold" style={{ fontSize: "9px" }}>Muito bom</span>
                        </div>
                      </div>
                    </div>

                    {/* Mini pillars */}
                    {[
                      { name: "Sono", val: 85 },
                      { name: "Energia", val: 78 },
                      { name: "Estresse", val: 68 },
                    ].map((p) => (
                      <div key={p.name} className="flex items-center gap-2">
                        <span className="text-petroleum font-semibold w-16 flex-shrink-0" style={{ fontSize: "9px" }}>{p.name}</span>
                        <div className="flex-1 h-1.5 rounded-full bg-mistgray overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${p.val}%`, background: "linear-gradient(90deg, #2F6F6E, #D7E94A)" }}
                          />
                        </div>
                        <span className="text-petroleum font-bold w-6 text-right" style={{ fontSize: "9px" }}>{p.val}</span>
                      </div>
                    ))}

                    <button
                      className="mt-1 w-full text-white font-bold rounded-full py-2 text-xs"
                      style={{ background: "#0D2B2B", fontSize: "9px" }}
                    >
                      Ver meu relatório completo
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div
                className="absolute -top-4 -right-6 card-glass px-3 py-2 text-xs font-semibold text-petroleum flex items-center gap-1.5 shadow-lg"
                style={{ borderRadius: "14px" }}
              >
                <span style={{ color: "#D7E94A", fontSize: "16px" }}>✦</span>
                Baseado em ciência
              </div>
              <div
                className="absolute -bottom-4 -left-6 card-glass px-3 py-2 text-xs font-semibold text-petroleum flex items-center gap-1.5 shadow-lg"
                style={{ borderRadius: "14px" }}
              >
                <span className="text-teal">🎯</span>
                Gratuito
              </div>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="reveal mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {trustCards.map((c) => (
            <div
              key={c.text}
              className="card-glass flex items-center gap-3 px-4 py-3"
            >
              <span className="text-2xl">{c.icon}</span>
              <span className="text-sm font-semibold text-petroleum">{c.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

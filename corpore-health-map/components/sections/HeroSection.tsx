"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

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
              <span style={{ color: "#8a9a20" }}>"dar conta"</span>
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
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#D7E94A" }} />
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

          {/* Right: real app image */}
          <div className="reveal flex justify-center lg:justify-end">
            <div className="relative animate-float">

              {/* Main phone image */}
              <div className="relative drop-shadow-2xl">
                <Image
                  src="/avaliacao-saude-online-corpore-health-map.png"
                  alt="Prévia do Corpore Health Map exibindo o Health Score e os pilares de saúde — avaliação de saúde online gratuita"
                  width={320}
                  height={620}
                  priority
                  className="w-auto max-h-[580px] object-contain"
                />
              </div>

              {/* Floating badge top */}
              <div
                className="absolute -top-3 -right-4 card-glass px-3 py-2 text-xs font-semibold text-petroleum flex items-center gap-1.5 shadow-lg"
                style={{ borderRadius: "14px" }}
              >
                <span style={{ color: "#D7E94A", fontSize: "16px" }}>✦</span>
                Baseado em ciência
              </div>

              {/* Floating badge bottom */}
              <div
                className="absolute -bottom-3 -left-4 card-glass px-3 py-2 text-xs font-semibold text-petroleum flex items-center gap-1.5 shadow-lg"
                style={{ borderRadius: "14px" }}
              >
                <span>🎯</span>
                100% gratuito
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

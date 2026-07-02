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

  const pillars = [
    "Alimentação Saudável",
    "Atividade Física",
    "Gestão do Estresse",
    "Sono Reparador",
    "Conexões Sociais",
    "Controle de Substâncias",
  ];

  const badgeStyle = {
    background: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: "14px",
    color: "#fff",
  };

  return (
    <section
      id="hero"
      ref={ref}
      aria-labelledby="hero-title"
      className="min-h-screen pt-24 pb-16 px-5 flex flex-col justify-center"
      style={{
        background:
          "radial-gradient(circle at top right, rgba(47,111,110,0.4), transparent 50%), linear-gradient(160deg, #0D2B2B 0%, #0f3333 60%, #164646 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center lg:items-start">

          {/* Left: text */}
          <div className="flex flex-col gap-6">
            <h1
              id="hero-title"
              className="reveal font-sora font-bold text-white leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)", letterSpacing: "-0.03em" }}
            >
              Seu corpo pode estar pedindo ajuda… mesmo que você ainda consiga{" "}
              <span style={{ color: "#D7E94A" }}>"dar conta"</span>
            </h1>

            <div className="reveal flex flex-col gap-3 max-w-lg">
              <p className="text-white/85 text-lg leading-relaxed font-semibold">
                Descubra agora o que pode estar afetando sua energia, disposição e qualidade de vida.
              </p>
              <p className="text-white/60 text-base leading-relaxed">
                Receba gratuitamente um mapa personalizado da sua saúde, desenvolvido por médicos
                especialistas em Medicina do Estilo de Vida, com análise dos principais pilares
                que influenciam sua saúde e longevidade:
              </p>
            </div>

            <ul className="reveal flex flex-wrap gap-2" aria-label="Pilares avaliados">
              {pillars.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-1.5 text-sm font-semibold text-white/85 rounded-full px-3 py-1.5"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#D7E94A" }} />
                  {p}
                </li>
              ))}
            </ul>

            <div className="reveal flex flex-col gap-3">
              <a
                href="https://healthmap.corporetraininggym.com.br/health-map/"
                className="self-start font-sora font-bold rounded-full text-base transition-all duration-200 hover:-translate-y-1 text-center"
                style={{
                  background: "#D7E94A",
                  color: "#0D2B2B",
                  padding: "16px 28px",
                  boxShadow: "0 12px 32px rgba(215,233,74,0.35)",
                }}
                aria-label="Fazer minha avaliação de saúde gratuitamente"
              >
                Fazer meu Health Map gratuitamente
              </a>
              <p className="text-xs font-semibold tracking-wide" style={{ color: "rgba(255,255,255,0.45)" }}>
                Avaliação gratuita &nbsp;•&nbsp; 100% online &nbsp;•&nbsp; Resultado personalizado
              </p>
            </div>
          </div>

          {/* Right: real app image */}
          <div className="reveal flex justify-center lg:justify-end">
            <div className="relative">
              <Image
                src="/avaliacao-saude-online-corpore-health-map.png"
                alt="Prévia do Corpore Health Map exibindo o Health Score e os pilares de saúde — avaliação de saúde online gratuita"
                width={320}
                height={620}
                priority
                className="w-auto max-h-[580px] object-contain animate-float"
              />

              {/* Badge topo */}
              <div
                className="absolute -top-3 -right-4 px-3 py-2 text-xs font-semibold flex items-center gap-1.5 shadow-lg"
                style={badgeStyle}
              >
                <span style={{ color: "#D7E94A" }}>✦</span>
                Baseado em ciência e experiência prática
              </div>

              {/* Badge meio — centralizado na altura da imagem */}
              <div
                className="absolute -left-6 bottom-0 px-3 py-2 text-xs font-semibold flex items-center gap-1.5 shadow-lg"
                style={badgeStyle}
              >
                <span style={{ color: "#D7E94A" }}>✦</span>
                Resultado rápido e personalizado
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


import SectionLabel from "@/components/ui/SectionLabel";

const discoveries = [
  {
    icon: "📊",
    title: "Score dos pilares da Medicina do Estilo de Vida",
    items: ["Alimentação Saudável", "Atividade Física", "Sono Reparador", "Controle de Substâncias Tóxicas", "Gestão do Estresse", "Conexões Sociais"],
  },
  {
    icon: "🔍",
    title: "Identificação dos principais gargalos da sua saúde",
    items: [],
  },
  {
    icon: "🧬",
    title: "Interpretação baseada em Medicina do Estilo de Vida",
    items: [],
  },
  {
    icon: "🎯",
    title: "Recomendações iniciais para melhorar sua qualidade de vida",
    items: [],
  },
];

export default function WhatIsSection() {
  return (
    <section
      id="health-map"
      aria-labelledby="health-map-title"
      className="py-20 px-5"
      style={{ background: "linear-gradient(135deg, #F7F8F6 0%, #E6ECE6 100%)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        <div className="reveal text-center max-w-2xl mx-auto flex flex-col gap-4">
          <SectionLabel className="block text-center">O QUE É O HEALTH MAP</SectionLabel>
          <h2
            id="health-map-title"
            className="font-sora font-bold text-petroleum"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", lineHeight: 1.15, letterSpacing: "-0.025em" }}
          >
            O que é uma avaliação de saúde e estilo de vida?
          </h2>
          <p className="text-petroleum/70 text-base leading-relaxed">
            O Health Map é uma análise moderna de saúde e estilo de vida baseada nos pilares da Medicina
            do Estilo de Vida. Mais do que um teste — uma visão clara sobre como está sua saúde hoje.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {discoveries.map((d) => (
            <div key={d.title} className="reveal card-glass p-6 flex flex-col gap-3">
              <span className="text-3xl" aria-hidden="true">{d.icon}</span>
              <h3 className="font-sora font-bold text-petroleum text-base leading-snug">{d.title}</h3>
              {d.items.length > 0 && (
                <ul className="flex flex-col gap-1.5">
                  {d.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-petroleum/70">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "#2F6F6E" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Closing card + CTA */}
        <div className="reveal card-glass p-7 flex flex-col md:flex-row items-center gap-6 text-center md:text-left"
          style={{ background: "rgba(255,255,255,0.9)" }}
        >
          <p className="text-petroleum font-semibold text-lg leading-snug flex-1">
            Tudo isso de forma{" "}
            <span className="font-bold" style={{ color: "#2F6F6E" }}>gratuita</span>,{" "}
            <span className="font-bold" style={{ color: "#2F6F6E" }}>rápida</span>,{" "}
            <span className="font-bold" style={{ color: "#2F6F6E" }}>acolhedora</span>,{" "}
            personalizada e baseada em ciência e comportamento humano.
          </p>
          <a
            href="https://healthmap.corporetraininggym.com.br/health-map/"
            className="btn-primary flex-shrink-0"
          >
            Quero entender minha saúde agora
          </a>
        </div>
      </div>
    </section>
  );
}

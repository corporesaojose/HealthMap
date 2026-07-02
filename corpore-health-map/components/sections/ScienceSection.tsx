import SectionLabel from "@/components/ui/SectionLabel";

const cards = [
  {
    icon: "🩺",
    title: "Medicina do Estilo de Vida",
    text: "Uma abordagem baseada em prevenção, comportamento e qualidade de vida.",
  },
  {
    icon: "🤖",
    title: "Tecnologia Inteligente",
    text: "A IA ajuda a organizar informações e personalizar a leitura dos seus dados.",
  },
  {
    icon: "🌐",
    title: "Visão do Todo",
    text: "Sono, energia, estresse, alimentação, movimento e conexões analisados em conjunto.",
  },
  {
    icon: "💡",
    title: "Recomendações Práticas",
    text: "Orientações iniciais para você entender por onde começar.",
  },
];

export default function ScienceSection() {
  return (
    <section
      id="ciencia"
      aria-labelledby="science-title"
      className="py-20 px-5"
      style={{ background: "linear-gradient(135deg, #0D2B2B 0%, #164646 100%)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        <div className="reveal text-center max-w-2xl mx-auto flex flex-col gap-4">
          <SectionLabel className="block text-center" style={{ color: "#D7E94A" } as React.CSSProperties}>
            CIÊNCIA QUE GUIA CADA DECISÃO
          </SectionLabel>
          <h2
            id="science-title"
            className="font-sora font-bold text-white"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", lineHeight: 1.15, letterSpacing: "-0.025em" }}
          >
            Medicina do Estilo de Vida aplicada à sua rotina.
          </h2>
          <p className="text-white/70 text-base leading-relaxed">
            O Corpore Health Map foi desenvolvido com base nos pilares da Medicina do Estilo de Vida,
            área da medicina focada em prevenção, comportamento e qualidade de vida.
          </p>
          <p className="text-white/60 text-sm leading-relaxed">
            A inteligência artificial é utilizada apenas para acelerar e personalizar a experiência.
            O mais importante continua sendo o conhecimento científico, o comportamento humano e a
            interpretação prática da vida real.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c) => (
            <div
              key={c.title}
              className="reveal flex flex-col gap-3 p-6 rounded-3xl border border-white/10 hover:border-lime/40 hover:-translate-y-1 transition-all duration-200"
              style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(8px)" }}
            >
              <span className="text-3xl" aria-hidden="true">{c.icon}</span>
              <h3 className="font-sora font-bold text-white text-sm leading-snug">{c.title}</h3>
              <p className="text-white/60 text-xs leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>

        <div className="reveal text-center">
          <a href="https://healthmap.corporetraininggym.com.br/health-map/" className="btn-primary" style={{ background: "#D7E94A", color: "#0D2B2B" }}>
            Fazer meu Health Map gratuitamente
          </a>
          <p className="text-white/40 text-xs mt-3">100% online &nbsp;•&nbsp; Gratuito &nbsp;•&nbsp; Resultado personalizado</p>
        </div>
      </div>
    </section>
  );
}


import Logo from "@/components/ui/Logo";
import SectionLabel from "@/components/ui/SectionLabel";

const pillarsIcons = [
  { icon: "👥", text: "Equipe especializada" },
  { icon: "🔐", text: "Tecnologia segura e confiável" },
  { icon: "🌿", text: "Abordagem integrativa" },
  { icon: "🛡️", text: "Foco em prevenção e longevidade" },
];

export default function AboutSection() {
  return (
    <section
      id="sobre"
      aria-labelledby="about-title"
      className="py-20 px-5"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className="reveal rounded-3xl p-10 md:p-14 flex flex-col gap-8"
          style={{ background: "linear-gradient(135deg, #0D2B2B 0%, #164646 100%)" }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
            <Logo variant="light" className="flex-shrink-0" />
            <div className="flex flex-col gap-2">
              <SectionLabel style={{ color: "#D7E94A" } as React.CSSProperties}>SOBRE A CORPORE</SectionLabel>
              <h2
                id="about-title"
                className="font-sora font-bold text-white"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: 1.15, letterSpacing: "-0.02em" }}
              >
                Ciência. Cuidado. Propósito.
              </h2>
            </div>
          </div>

          <p className="text-white/75 text-base leading-relaxed max-w-2xl">
            A Corpore Health Map nasceu para transformar dados em decisões e decisões em vida.
            Unimos tecnologia, Medicina do Estilo de Vida e acolhimento para ajudar você no caminho
            da sua melhor versão.
          </p>

          <p className="text-white/55 text-sm leading-relaxed max-w-2xl">
            Criado pela Corpore Training Gym, no Jardim Esplanada, em São José dos Campos, o
            Corpore Health Map ajuda pessoas que buscam mais energia, saúde e qualidade de vida
            a entenderem melhor seus hábitos e sinais do corpo.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {pillarsIcons.map((p) => (
              <div
                key={p.text}
                className="flex flex-col items-start gap-2 p-4 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <span className="text-2xl" aria-hidden="true">{p.icon}</span>
                <span className="text-white/75 text-xs font-semibold leading-snug">{p.text}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <button type="button" className="btn-primary" style={{ background: "#D7E94A", color: "#0D2B2B" }}>
              Fazer meu Health Map gratuitamente
            </button>
            <p className="text-white/40 text-xs">100% online &nbsp;•&nbsp; Gratuito &nbsp;•&nbsp; Seguro e sigiloso</p>
          </div>
        </div>
      </div>
    </section>
  );
}

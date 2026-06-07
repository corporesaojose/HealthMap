import SectionLabel from "@/components/ui/SectionLabel";

const symptoms = [
  "Viver cansadas",
  "Perder energia",
  "Sentir dores",
  "Começar e parar rotinas",
  "Dormir mal",
  "Sentir que o corpo já não responde igual",
];

const cards = [
  {
    icon: "💼",
    title: "Trabalhador Sobrecarregado",
    text: "Você dá conta de tudo… mas sente que está constantemente cansado.",
    bg: "bg-blue-clinical",
  },
  {
    icon: "⏰",
    title: "40+ em alerta",
    text: "O corpo já não recupera como antes. E a energia diminuiu nos últimos anos.",
    bg: "bg-peach-soft",
  },
  {
    icon: "🔄",
    title: "Começa e para",
    text: "Você sabe o que precisa fazer… mas não consegue manter constância.",
    bg: "bg-lavender-soft",
  },
  {
    icon: "🤖",
    title: "Saúde no automático",
    text: "Você funciona bem. Mas sente que deixou de cuidar verdadeiramente de você.",
    bg: "bg-sand-light",
  },
];

export default function ProblemSection() {
  return (
    <section id="problema" aria-labelledby="problem-title" className="py-20 px-5 bg-offwhite">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left text */}
          <div className="reveal flex flex-col gap-5">
            <SectionLabel>O PROBLEMA</SectionLabel>
            <h2
              id="problem-title"
              className="font-sora font-bold text-petroleum"
              style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", lineHeight: 1.15, letterSpacing: "-0.025em" }}
            >
              Cansaço constante, sono ruim e falta de energia podem ser sinais de que sua rotina precisa de atenção.
            </h2>

            <p className="text-petroleum/70 text-base leading-relaxed">
              Trabalho. Responsabilidades. Pressão. Pouco tempo. Sono ruim. Estresse constante.
            </p>
            <p className="text-petroleum/70 text-base leading-relaxed">
              Com o tempo, muitas pessoas começam a achar normal:
            </p>

            <ul className="flex flex-col gap-2" aria-label="Sinais de alerta">
              {symptoms.map((s) => (
                <li key={s} className="flex items-start gap-2.5 text-base text-petroleum/80 font-medium">
                  <span className="mt-1 w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: "#D7E94A" }}>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4L3 5.5L6.5 2" stroke="#0D2B2B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {s}
                </li>
              ))}
            </ul>

            {/* Alert box */}
            <div
              className="rounded-2xl p-5 border-l-4 mt-2"
              style={{ borderColor: "#2F6F6E", background: "rgba(47,111,110,0.07)" }}
            >
              <p className="font-semibold text-petroleum text-base leading-snug">
                O problema é que nem sempre estar funcionando significa estar saudável.
              </p>
              <p className="text-petroleum/65 text-sm mt-2 leading-relaxed">
                E muitas vezes o corpo começa a dar sinais muito antes da doença aparecer.
              </p>
            </div>
          </div>

          {/* Right: cards */}
          <div className="grid grid-cols-2 gap-4">
            {cards.map((c) => (
              <div
                key={c.title}
                className={`reveal card-glass ${c.bg} flex flex-col gap-3 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-200`}
              >
                <span className="text-3xl" aria-hidden="true">{c.icon}</span>
                <h3 className="font-sora font-bold text-petroleum text-sm leading-snug">{c.title}</h3>
                <p className="text-petroleum/65 text-xs leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

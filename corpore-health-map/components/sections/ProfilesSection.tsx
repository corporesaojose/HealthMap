import SectionLabel from "@/components/ui/SectionLabel";

const profiles = [
  {
    emoji: "💼",
    title: "Profissional Sobrecarregado",
    text: "Você trabalha muito, resolve tudo, mantém a rotina funcionando… mas sente que está constantemente cansado, acelerado e com pouca recuperação.",
    bg: "bg-blue-clinical",
    accent: "#E6F0F7",
  },
  {
    emoji: "⏳",
    title: "40+ em Alerta Funcional",
    text: "Seu corpo ainda responde. Mas você percebe que a energia mudou, o sono piorou, as dores aumentaram e recuperar já não é tão fácil quanto antes.",
    bg: "bg-peach-soft",
    accent: "#FFE9DC",
  },
  {
    emoji: "🔄",
    title: "Começa e Para",
    text: "Você sabe exatamente o que precisa fazer. Mas sente dificuldade de manter constância no meio da rotina, trabalho, estresse e responsabilidades.",
    bg: "bg-lavender-soft",
    accent: "#EDE9F7",
  },
  {
    emoji: "😴",
    title: "Saúde no Automático",
    text: "Você continua funcionando normalmente. Mas sente que deixou de cuidar verdadeiramente da própria saúde nos últimos anos.",
    bg: "bg-sand-light",
    accent: "#F4EFE6",
  },
  {
    emoji: "⚡",
    title: "Energia em Queda",
    text: "Você consegue dar conta. Mas sente menos disposição, menos motivação, mais cansaço, mais desgaste mental e menos energia para viver o dia com qualidade.",
    bg: "bg-mistgray",
    accent: "#E6E9E5",
  },
];

export default function ProfilesSection() {
  return (
    <section
      id="perfis"
      aria-labelledby="profiles-title"
      className="py-20 px-5"
      style={{ background: "linear-gradient(135deg, #F7F8F6 0%, #EAF1EE 100%)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        <div className="reveal text-center max-w-2xl mx-auto flex flex-col gap-4">
          <SectionLabel className="block text-center">PERFIS REAIS</SectionLabel>
          <h2
            id="profiles-title"
            className="font-sora font-bold text-petroleum"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", lineHeight: 1.15, letterSpacing: "-0.025em" }}
          >
            Para quem sente que precisa cuidar melhor da saúde, mas não sabe por onde começar.
          </h2>
          <p className="text-petroleum/70 text-base leading-relaxed">
            A maioria das pessoas espera a saúde piorar para começar a cuidar dela. O objetivo do
            Health Map é justamente o contrário: ajudar você a perceber sinais silenciosos antes
            que eles se transformem em problemas maiores.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {profiles.slice(0, 3).map((p) => (
            <ProfileCard key={p.title} profile={p} />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto w-full">
          {profiles.slice(3).map((p) => (
            <ProfileCard key={p.title} profile={p} />
          ))}
        </div>

        <div className="reveal text-center">
          <p className="text-petroleum/60 text-sm mb-4">
            Talvez você se identifique com algum desses perfis.
          </p>
          <button type="button" className="btn-primary">
            Fazer meu Health Map gratuitamente
          </button>
        </div>
      </div>
    </section>
  );
}

function ProfileCard({ profile }: { profile: typeof profiles[0] }) {
  return (
    <div
      className={`reveal card-glass ${profile.bg} flex flex-col gap-3 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-200`}
    >
      <span className="text-4xl" aria-hidden="true">{profile.emoji}</span>
      <h3 className="font-sora font-bold text-petroleum text-base leading-snug">{profile.title}</h3>
      <p className="text-petroleum/65 text-sm leading-relaxed">{profile.text}</p>
    </div>
  );
}

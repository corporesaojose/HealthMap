import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";

const profiles = [
  {
    image: "/perfil-profissional-sobrecarregado-estresse-trabalho.png",
    alt: "Profissional sobrecarregado com estresse no trabalho â€” perfil Health Map",
    title: "Profissional Sobrecarregado",
    text: "VocÃª trabalha muito, resolve tudo, mantÃ©m a rotina funcionandoâ€¦ mas sente que estÃ¡ constantemente cansado, acelerado e com pouca recuperaÃ§Ã£o.",
    accent: "#2F6F6E",
  },
  {
    image: "/perfil-40-anos-alerta-funcional-dor-fadiga-saude.png",
    alt: "Pessoa acima de 40 anos com dores e fadiga â€” perfil alerta funcional Health Map",
    title: "40+ em Alerta Funcional",
    text: "Seu corpo ainda responde. Mas vocÃª percebe que a energia mudou, o sono piorou, as dores aumentaram e recuperar jÃ¡ nÃ£o Ã© tÃ£o fÃ¡cil quanto antes.",
    accent: "#C47A4A",
  },
  {
    image: "/perfil-comeca-e-para-exercicio-constancia-saude.png",
    alt: "Pessoas tentando manter constÃ¢ncia nos exercÃ­cios â€” perfil comeÃ§a e para Health Map",
    title: "ComeÃ§a e Para",
    text: "VocÃª sabe exatamente o que precisa fazer. Mas sente dificuldade de manter constÃ¢ncia no meio da rotina, trabalho, estresse e responsabilidades.",
    accent: "#6B5EA8",
  },
  {
    image: "/perfil-saude-no-automatico-alimentacao-sedentarismo.png",
    alt: "Casal com alimentaÃ§Ã£o inadequada e sedentarismo â€” perfil saÃºde no automÃ¡tico Health Map",
    title: "SaÃºde no AutomÃ¡tico",
    text: "VocÃª continua funcionando normalmente. Mas sente que deixou de cuidar verdadeiramente da prÃ³pria saÃºde nos Ãºltimos anos.",
    accent: "#8B7355",
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
            Para quem sente que precisa cuidar melhor da saÃºde, mas nÃ£o sabe por onde comeÃ§ar.
          </h2>
          <p className="text-petroleum/70 text-base leading-relaxed">
            A maioria das pessoas espera a saÃºde piorar para comeÃ§ar a cuidar dela. O objetivo do
            Health Map Ã© justamente o contrÃ¡rio: ajudar vocÃª a perceber sinais silenciosos antes
            que eles se transformem em problemas maiores.
          </p>
        </div>

        {/* Grid 2x2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {profiles.map((p) => (
            <ProfileCard key={p.title} profile={p} />
          ))}
        </div>

        <div className="reveal text-center">
          <p className="text-petroleum/60 text-sm mb-4">
            Talvez vocÃª se identifique com algum desses perfis.
          </p>
          <a href="https://healthmap.corporetraininggym.com.br/health-map/" className="btn-primary">
            Fazer meu Health Map gratuitamente
          </a>
        </div>
      </div>
    </section>
  );
}

function ProfileCard({ profile }: { profile: typeof profiles[0] }) {
  return (
    <div className="reveal flex flex-col rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 bg-white">
      {/* Foto */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src={profile.image}
          alt={profile.alt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Gradiente sutil na base da foto */}
        <div
          className="absolute inset-x-0 bottom-0 h-16"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.35), transparent)" }}
        />
      </div>

      {/* Texto */}
      <div className="flex flex-col gap-2 p-5 flex-1">
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: profile.accent }}
          />
          <h3 className="font-sora font-bold text-petroleum text-sm leading-snug">{profile.title}</h3>
        </div>
        <p className="text-petroleum/65 text-sm leading-relaxed">{profile.text}</p>
      </div>
    </div>
  );
}


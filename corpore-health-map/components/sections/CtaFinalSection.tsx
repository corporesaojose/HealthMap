import Image from "next/image";

export default function CtaFinalSection() {
  return (
    <section
      id="cta-final"
      aria-labelledby="final-cta-title"
      className="py-20 px-5"
      style={{
        background:
          "radial-gradient(circle at bottom left, rgba(215,233,74,0.15), transparent 40%), linear-gradient(135deg, #F7F8F6 0%, #EAF1EE 100%)",
      }}
    >
      <div className="max-w-3xl mx-auto">
        <div
          className="reveal card-glass flex flex-col items-center gap-6 p-10 md:p-14 text-center"
          style={{ background: "rgba(255,255,255,0.92)" }}
        >
          {/* Lime accent */}
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #D7E94A, #F2F8C9)" }}
            aria-hidden="true"
          >
            <Image
              src="/logo-marca-preto.webp"
              alt=""
              width={28}
              height={24}
              className="object-contain"
            />
          </div>

          <h2
            id="final-cta-title"
            className="font-sora font-bold text-petroleum"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", lineHeight: 1.15, letterSpacing: "-0.025em" }}
          >
            Você continua dando conta. Mas talvez esteja na hora de voltar a cuidar de você também.
          </h2>

          <p className="text-petroleum/65 text-base leading-relaxed max-w-lg">
            Faça gratuitamente seu Corpore Health Map e descubra como estão os pilares da sua
            saúde, energia e estilo de vida.
          </p>

          <a
            href="https://healthmap.corporetraininggym.com.br/health-map/"
            className="btn-primary animate-pulse-lime text-base py-4 px-8"
            aria-label="Fazer minha avaliação de saúde gratuitamente"
          >
            Fazer meu Health Map gratuitamente
          </a>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            {["100% online", "Seguro e sigiloso", "Suporte humano"].map((tag) => (
              <span key={tag} className="flex items-center gap-1.5 text-xs font-semibold text-teal">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#D7E94A" }} />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


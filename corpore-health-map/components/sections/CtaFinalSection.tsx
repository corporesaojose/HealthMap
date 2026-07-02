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
            <svg width="28" height="28" viewBox="0 0 100 100">
              <path d="M78 22C66 14 50 12 36 18C20 25 10 41 10 58C10 76 22 90 38 94C54 98 70 92 80 80C86 72 90 62 90 50C90 38 85 28 78 22ZM38 86C26 80 18 68 18 54C18 40 28 27 42 22C36 30 33 40 33 50C33 62 37 74 44 82C42 84 40 85 38 86Z" fill="#0D2B2B"/>
            </svg>
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


import Logo from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer className="py-12 px-5 bg-petroleum" role="contentinfo">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <Logo variant="light" />
          <address className="not-italic text-white/50 text-sm leading-relaxed">
            <strong className="text-white/70 font-semibold block">Corpore São José dos Campos</strong>
            Av. Barão do Rio Branco, 540 — Jardim Esplanada<br />
            São José dos Campos — SP<br />
            <a href="mailto:corpore.saojose@gmail.com" className="hover:text-lime transition-colors" style={{ color: "rgba(215,233,74,0.6)" }}>
              corpore.saojose@gmail.com
            </a>
          </address>
        </div>

        <div className="h-px" style={{ background: "rgba(255,255,255,0.08)" }} />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/35">
          <p>© {new Date().getFullYear()} Corpore São José dos Campos. Todos os direitos reservados.</p>
          <p className="text-center md:text-right max-w-sm leading-relaxed">
            A avaliação de saúde online não substitui consulta médica, diagnóstico ou tratamento profissional.
          </p>
        </div>
      </div>
    </footer>
  );
}

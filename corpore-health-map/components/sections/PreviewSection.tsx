import SectionLabel from "@/components/ui/SectionLabel";
import ScoreCard from "@/components/ui/ScoreCard";

export default function PreviewSection() {
  return (
    <section id="preview" aria-labelledby="preview-title" className="py-20 px-5 bg-offwhite">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        <div className="reveal text-center max-w-2xl mx-auto flex flex-col gap-4">
          <SectionLabel className="block text-center">UMA PRÉVIA DO QUE REVELAMOS</SectionLabel>
          <h2
            id="preview-title"
            className="font-sora font-bold text-petroleum"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", lineHeight: 1.15, letterSpacing: "-0.025em" }}
          >
            Dados que revelam. Insights que transformam.
          </h2>
          <p className="text-petroleum/70 text-base leading-relaxed">
            Entenda seus principais pontos de atenção antes que eles se tornem problemas maiores.
          </p>
        </div>

        <ScoreCard />

        <div className="reveal text-center">
          <p className="text-teal font-semibold text-base">
            Entenda, priorize e evolua com base em evidências.
          </p>
        </div>
      </div>
    </section>
  );
}

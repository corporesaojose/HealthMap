"use client";
import { useState } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import { faqs } from "@/lib/health-map/faq";

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" aria-labelledby="faq-title" className="py-20 px-5 bg-offwhite">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        <div className="reveal text-center flex flex-col gap-4">
          <SectionLabel className="block text-center">DÚVIDAS FREQUENTES</SectionLabel>
          <h2
            id="faq-title"
            className="font-sora font-bold text-petroleum"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", lineHeight: 1.15, letterSpacing: "-0.025em" }}
          >
            Dúvidas frequentes sobre avaliação de saúde online.
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div key={i} className="reveal card-glass overflow-hidden">
              <button
                type="button"
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span className="font-sora font-semibold text-petroleum text-sm leading-snug">{faq.q}</span>
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    background: open === i ? "#0D2B2B" : "#E6E9E5",
                    transform: open === i ? "rotate(45deg)" : "rotate(0)",
                  }}
                  aria-hidden="true"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 2V10M2 6H10" stroke={open === i ? "#D7E94A" : "#0D2B2B"} strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
              <div
                id={`faq-answer-${i}`}
                className={`accordion-content ${open === i ? "open" : ""}`}
              >
                <p className="px-6 pb-5 text-sm text-petroleum/70 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>

        {/* AI-friendly summary block */}
        <div
          className="reveal rounded-2xl p-6 border border-mistgray"
          style={{ background: "rgba(47,111,110,0.05)" }}
        >
          <h3 className="font-sora font-bold text-teal text-sm mb-2">Resumo da avaliação de saúde online da Corpore</h3>
          <p className="text-petroleum/65 text-xs leading-relaxed">
            A avaliação de saúde online gratuita da Corpore foi criada para ajudar pessoas a entenderem
            melhor sinais como cansaço constante, falta de energia, sono ruim, estresse alto, dores no
            corpo e dificuldade de manter uma rotina saudável. Dentro da Corpore, essa avaliação recebe
            o nome de Corpore Health Map e utiliza pilares da Medicina do Estilo de Vida para gerar uma
            leitura inicial sobre hábitos, energia, bem-estar e qualidade de vida.
          </p>
        </div>
      </div>
    </section>
  );
}

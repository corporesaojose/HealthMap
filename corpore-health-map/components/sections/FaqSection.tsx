"use client";
import { useState } from "react";
import SectionLabel from "@/components/ui/SectionLabel";

const faqs = [
  {
    q: "O que é uma avaliação de saúde online?",
    a: "Uma avaliação de saúde online é uma forma inicial de entender hábitos, rotina, sono, energia, estresse, alimentação, dores e outros fatores relacionados à qualidade de vida. Ela não substitui uma consulta médica, mas ajuda a identificar pontos de atenção e caminhos para cuidar melhor da saúde.",
  },
  {
    q: "Como funciona o Health Map?",
    a: "Você responde a uma avaliação online sobre hábitos, rotina, energia, sono, estresse, alimentação, dores e outros pilares da sua saúde. A partir disso, geramos uma leitura personalizada para ajudar você a entender seus principais pontos de atenção.",
  },
  {
    q: "Como saber se minha saúde está boa?",
    a: "Além de exames e acompanhamento profissional, sinais como energia, sono, disposição, dores, estresse, alimentação e constância na atividade física ajudam a entender como está sua saúde no dia a dia. O Corpore Health Map organiza essas informações para gerar uma leitura inicial personalizada.",
  },
  {
    q: "Por que sinto cansaço constante mesmo dormindo?",
    a: "O cansaço constante pode estar relacionado a vários fatores, como sono de baixa qualidade, estresse, alimentação inadequada, sedentarismo, excesso de responsabilidades ou outros pontos que merecem avaliação profissional. O Health Map ajuda a identificar possíveis gargalos de estilo de vida, mas não substitui uma consulta médica.",
  },
  {
    q: "A avaliação de saúde online substitui consulta médica?",
    a: "Não. A avaliação de saúde online não substitui consulta médica, diagnóstico ou tratamento. Ela funciona como uma leitura inicial de hábitos e estilo de vida, ajudando a pessoa a entender melhor seus pontos de atenção e buscar orientação adequada quando necessário.",
  },
  {
    q: "Quais exames são utilizados?",
    a: "Nesta primeira etapa, o Health Map utiliza informações comportamentais e de estilo de vida. Caso existam exames ou dados adicionais, eles podem ajudar em uma análise mais completa posteriormente.",
  },
  {
    q: "Em quanto tempo recebo o resultado?",
    a: "Após preencher a avaliação, você recebe uma leitura personalizada com os principais pontos do seu mapa de saúde.",
  },
  {
    q: "Onde fazer uma avaliação de saúde em São José dos Campos?",
    a: "A Corpore Training Gym, localizada no Jardim Esplanada em São José dos Campos, oferece o Corpore Health Map, uma avaliação online gratuita de saúde e estilo de vida para ajudar pessoas a entenderem melhor sono, energia, estresse, alimentação, dores e hábitos.",
  },
  {
    q: "Meus dados estão seguros?",
    a: "Sim. As informações são tratadas com privacidade, segurança e responsabilidade, sendo utilizadas apenas para gerar sua análise e orientar sua experiência.",
  },
];

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

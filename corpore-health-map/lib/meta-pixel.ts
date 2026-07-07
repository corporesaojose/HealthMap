declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function gerarEventId(prefix: string): string {
  return prefix + "_" + Date.now() + "_" + Math.random().toString(36).slice(2, 9);
}

// eventId é gerado uma única vez em quem chama (page.tsx) e reaproveitado
// no evento CAPI enviado ao n8n — o Meta usa esse ID para deduplicar o par
// Pixel + CAPI e tratar como um único evento.
export function trackLead(eventId: string) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", "Lead", { content_name: "Formulario Health Map" }, { eventID: eventId });
}

// Disparado quando a pessoa inicia o questionário (tela de boas-vindas do
// /health-map/), distinto do PageView genérico — permite criar público de
// remarketing de quem começou mas não concluiu a avaliação.
export function trackStartQuiz() {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("trackCustom", "StartQuiz", {}, { eventID: gerarEventId("startquiz") });
}

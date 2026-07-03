declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function gerarEventId(prefix: string): string {
  return prefix + "_" + Date.now() + "_" + Math.random().toString(36).slice(2, 9);
}

export function trackLead() {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", "Lead", {}, { eventID: gerarEventId("lead") });
}

// Disparado quando a pessoa inicia o questionário (tela de boas-vindas do
// /health-map/), distinto do PageView genérico — permite criar público de
// remarketing de quem começou mas não concluiu a avaliação.
export function trackStartQuiz() {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("trackCustom", "StartQuiz", {}, { eventID: gerarEventId("startquiz") });
}

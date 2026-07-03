declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function gerarEventId(): string {
  return "lead_" + Date.now() + "_" + Math.random().toString(36).slice(2, 9);
}

export function trackLead() {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", "Lead", {}, { eventID: gerarEventId() });
}

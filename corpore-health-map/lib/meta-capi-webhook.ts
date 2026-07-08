import type { RegistrationData } from '@/lib/health-map/types'

// URL pública do webhook (não é segredo — qualquer NEXT_PUBLIC_* já fica
// exposto no bundle do navegador). Fixada no código porque o build do
// Hostinger não repassa variáveis de ambiente para o passo `next build`.
const N8N_WEBHOOK_URL = 'https://n8n.corporetraininggym.com.br/webhook/health-map-lead'

function getCookie(name: string): string | null {
  return document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]+)`))?.[1] ?? null
}

// Dispara em paralelo ao Pixel do navegador, com o mesmo eventId, para que o
// n8n monte e envie o evento Lead ao Meta CAPI (servidor) — o Meta deduplica
// os dois sinais (Pixel + CAPI) usando esse event_id compartilhado.
export function sendLeadToMetaCapi(registration: RegistrationData, eventId: string) {
  if (typeof window === 'undefined' || !N8N_WEBHOOK_URL) return

  fetch(N8N_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nome: registration.name,
      telefone: registration.phone,
      email: registration.email,
      event_id: eventId,
      event_time: Math.floor(Date.now() / 1000),
      page_url: window.location.href,
      client_user_agent: navigator.userAgent,
      fbp: getCookie('_fbp'),
      fbc: getCookie('_fbc'),
    }),
  }).catch(error => console.error('Erro ao enviar lead para o Meta CAPI:', error))
}

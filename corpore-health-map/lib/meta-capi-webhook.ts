import type { RegistrationData } from '@/lib/health-map/types'

const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_HEALTH_MAP_WEBHOOK_URL

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

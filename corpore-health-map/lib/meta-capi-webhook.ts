import type { RegistrationData } from '@/lib/health-map/types'

// URL pública do webhook (não é segredo — qualquer NEXT_PUBLIC_* já fica
// exposto no bundle do navegador). Fixada no código porque o build do
// Hostinger não repassa variáveis de ambiente para o passo `next build`.
const N8N_WEBHOOK_URL = 'https://n8n.corporetraininggym.com.br/webhook/health-map-lead'

function getCookie(name: string): string | null {
  return document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]+)`))?.[1] ?? null
}

function getOrCreateExternalId(): string | null {
  try {
    let eid = localStorage.getItem('_meta_eid')
    if (!eid) {
      eid = crypto.randomUUID ? crypto.randomUUID() : ('eid_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9))
      localStorage.setItem('_meta_eid', eid)
    }
    return eid
  } catch {
    return null
  }
}

interface SendMetaCapiEventParams {
  eventName: string
  eventId: string
  registration?: RegistrationData
}

// Dispara em paralelo ao Pixel do navegador, com o mesmo eventId, para que o
// n8n monte e envie o evento correspondente ao Meta CAPI (servidor) — o Meta
// deduplica os dois sinais (Pixel + CAPI) usando esse event_id compartilhado.
export function sendEventToMetaCapi({ eventName, eventId, registration }: SendMetaCapiEventParams) {
  if (typeof window === 'undefined') return

  fetch(N8N_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event_name: eventName,
      nome: registration?.name ?? '',
      telefone: registration?.phone ?? '',
      email: registration?.email ?? '',
      event_id: eventId,
      event_time: Math.floor(Date.now() / 1000),
      page_url: window.location.href,
      client_user_agent: navigator.userAgent,
      fbp: getCookie('_fbp'),
      fbc: getCookie('_fbc'),
      external_id: getOrCreateExternalId(),
    }),
  }).catch(error => console.error(`Erro ao enviar ${eventName} para o Meta CAPI:`, error))
}

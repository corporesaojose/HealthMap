import type { RegistrationData, HealthMapResult } from '@/lib/health-map/types'

// URL pública do webhook (não é segredo — qualquer NEXT_PUBLIC_* já fica
// exposto no bundle do navegador). Fixada no código porque o build do
// Hostinger não repassa variáveis de ambiente para o passo `next build`
// (mesmo motivo documentado em lib/meta-capi-webhook.ts).
const N8N_REPORT_WEBHOOK_URL = 'https://n8n.corporetraininggym.com.br/webhook/health-map-resultado'

interface SendHealthMapReportWebhookParams {
  registration: RegistrationData
  result: HealthMapResult
  assessId: string
  reportToken: string
}

// Dispara em paralelo ao fluxo principal, sem bloquear a UI — o n8n gera o
// conteúdo do relatório por IA e aciona o Chatguru de forma assíncrona.
export function sendHealthMapReportWebhook({ registration, result, assessId, reportToken }: SendHealthMapReportWebhookParams) {
  if (typeof window === 'undefined') return

  fetch(N8N_REPORT_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      assessId,
      reportToken,
      registration,
      result,
    }),
  }).catch(error => console.error('Erro ao enviar webhook de relatório pro n8n:', error))
}

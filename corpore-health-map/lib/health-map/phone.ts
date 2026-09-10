/**
 * Validacao de celular brasileiro para o Health Map.
 *
 * O relatorio e enviado por WhatsApp para o numero cadastrado, entao aqui so
 * aceitamos celular (11 digitos, comecando com 9 apos o DDD). Numero fixo, DDD
 * inexistente ou digito faltando resultavam em lead que nunca recebia nada.
 */

// DDDs em uso no Brasil (Anatel). Fora dessa lista o numero não existe.
const DDDS_VALIDOS = new Set([
  11, 12, 13, 14, 15, 16, 17, 18, 19,
  21, 22, 24, 27, 28,
  31, 32, 33, 34, 35, 37, 38,
  41, 42, 43, 44, 45, 46, 47, 48, 49,
  51, 53, 54, 55,
  61, 62, 63, 64, 65, 66, 67, 68, 69,
  71, 73, 74, 75, 77, 79,
  81, 82, 83, 84, 85, 86, 87, 88, 89,
  91, 92, 93, 94, 95, 96, 97, 98, 99,
])

export function onlyDigits(value: string) {
  return (value || '').replace(/\D/g, '')
}

export function formatPhone(value: string) {
  const digits = onlyDigits(value).slice(0, 11)
  if (digits.length <= 2) return digits
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

export interface PhoneValidation {
  ok: boolean
  error?: string
}

export function validateMobilePhone(value: string): PhoneValidation {
  const digits = onlyDigits(value)

  if (!digits) return { ok: false, error: 'Informe seu WhatsApp' }

  if (digits.length < 11) {
    return { ok: false, error: 'Faltam dígitos — o WhatsApp tem DDD + 9 dígitos' }
  }
  if (digits.length > 11) {
    return { ok: false, error: 'Dígitos a mais — o WhatsApp tem DDD + 9 dígitos' }
  }

  const ddd = Number(digits.slice(0, 2))
  if (!DDDS_VALIDOS.has(ddd)) {
    return { ok: false, error: `DDD ${digits.slice(0, 2)} não existe` }
  }

  const numero = digits.slice(2)
  if (numero[0] !== '9') {
    return { ok: false, error: 'Celular começa com 9 depois do DDD' }
  }

  // (12) 99999-9999, (11) 90000-0000 e afins: digitado so para passar da tela
  if (/^(\d)\1{8}$/.test(numero)) {
    return { ok: false, error: 'Esse número não parece real' }
  }

  return { ok: true }
}

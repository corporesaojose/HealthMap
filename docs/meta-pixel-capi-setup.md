# Estrutura de Pixel + CAPI — Health Map

Referência técnica de como o Meta Pixel + Conversions API (CAPI) foi implementado
no site do Health Map (`healthmap.corporetraininggym.com.br`). Usar como contexto
para replicar a mesma estrutura em outros sites.

## Objetivo

Todo evento do Pixel (navegador) tem um espelho no CAPI (servidor), com o mesmo
`event_id`, para o Meta deduplicar os dois sinais e não perder conversões de quem
tem o pixel bloqueado (iOS, ad-blockers, Safari ITP).

## Arquitetura

```
Navegador (Next.js)                    n8n                          Meta
─────────────────────                 ─────                        ─────
1. Gera event_id
   (crypto.randomUUID())
2. Dispara fbq('track', ...,
   { eventID: event_id })      ──────────────────────────────►  Pixel recebe
3. POST pro webhook n8n     ──►  Webhook recebe
   (mesmos dados + event_id)      ▼
                                Code node: hash SHA-256
                                dos dados pessoais
                                  ▼
                                HTTP Request: POST pro
                                Graph API do Meta          ──►  CAPI recebe
                                (action_source: website)        (mesmo event_id
                                                                  → Meta dedupe)
```

## Eventos cobertos

`PageView`, `StartQuiz` (custom, dispara ao iniciar o formulário) e `Lead`
(dispara ao concluir/enviar o formulário).

## Frontend (Next.js) — pontos-chave

- Um `event_id` (`crypto.randomUUID()`) é gerado por evento e usado **nos dois
  lados** (parâmetro `eventID` no `fbq()` e campo `event_id` no payload pro n8n).
- **PageView precisa de um delay** (~1.2s) antes de ler os cookies `_fbp`/`_fbc`
  — o `fbevents.js` carrega assíncrono, então ler os cookies imediatamente após
  `fbq('init', ...)` pega eles ainda vazios.
- **URL do webhook n8n fixada direto no código**, não como variável de ambiente
  `NEXT_PUBLIC_*` — o build do Hostinger não repassa env vars pro passo
  `next build` (variáveis `NEXT_PUBLIC_` são "gravadas" no JS no momento do
  build, não em runtime). Como a URL não é segredo (fica exposta no bundle do
  navegador de qualquer forma), fixar no código resolve. Se o próximo site for
  hospedado em algo que repassa env vars corretamente pro build (Vercel, por
  exemplo), pode usar `NEXT_PUBLIC_*` normalmente.
- Envio pro n8n é "fire and forget" (`fetch(...).catch(...)`), não bloqueia a
  navegação do usuário.

## n8n — estrutura do workflow

Um workflow único e genérico (webhook → hash → envio), reaproveitado pros 3
eventos via um campo `event_name` no payload (em vez de um workflow por evento):

1. **Webhook** (POST, `responseMode: onReceived` — responde na hora, não espera
   o resto do fluxo).
2. **Code node** — hash SHA-256 puro em JS (sem `require('crypto')`, que pode
   não estar liberado no sandbox do Code node) de email, telefone (formato
   E.164 com `55` na frente) e nome; monta o payload final pro Graph API.
3. **HTTP Request** — `POST https://graph.facebook.com/v21.0/{PIXEL_ID}/events`,
   autenticação `genericCredentialType` → `httpQueryAuth` (credencial "Query
   Auth account" já existente no n8n, com o access token), `options.response.
   neverError: true` (pra falha no CAPI não quebrar o resto do fluxo).

**user_data enviado:** `em`, `ph`, `fn`, `ln` (todos hasheados, só incluídos se
existirem — PageView/StartQuiz não têm PII), `client_ip_address`,
`client_user_agent`, `fbp`, `fbc` (esses dois lidos do navegador e repassados,
não hasheados).

## Pegadinhas que valem pro próximo site

1. **`fbclid` se perde em redirecionamentos.** Se a URL do anúncio passa por um
   redirect (encurtador, www→sem-www, etc.) antes de chegar na página com o
   pixel, o `fbclid` some da URL e o `_fbc` nunca é gravado. Usar sempre a URL
   final direta no anúncio (testado e confirmado nesse projeto).
2. **Anexar a credencial no nó HTTP Request do n8n só deu pra fazer
   manualmente pela interface** — a ferramenta MCP de editar workflows não
   conseguiu vincular a credencial via API (erro genérico "does not accept
   credential"). Se for outro n8n/pixel, esse passo manual provavelmente se
   repete.
3. **Testar direto no n8n antes de confiar**: dá pra mandar um POST de teste
   direto no webhook (sem passar pelo site) e checar no histórico de
   execuções se o node final retornou `events_received: 1` — isso confirma
   autenticação e formato do payload sem precisar gerar lead de verdade.
4. **Conferir com dados reais da conta de anúncios**, não só pelo código —
   usar as ferramentas de EMQ (`event_match_quality`) e volume por
   `event_source` (BROWSER vs SERVER) do Meta Ads pra confirmar se o problema
   é volume/cobertura ou bug de instalação.

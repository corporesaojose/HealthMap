import type { Metadata } from 'next'
import type { RowDataPacket } from 'mysql2'
import { pool } from '@/lib/db/pool'
import RelatorioClient from './RelatorioClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

interface AssessmentRow extends RowDataPacket {
  id: number
  health_score: number
  health_score_class: string
  profile_name: string
  pillar_scores: string
  report_content: string | null
  lead_name: string
}

const WHATSAPP_NUMBER = '551239094444'
const WHATSAPP_MESSAGE =
  'Oi! Acabei de fazer o Health Map da Corpore e recebi meu score nos 6 pilares de saúde. Fiquei curioso(a) para entender melhor os resultados e o que posso fazer para evoluir. Vocês podem me ajudar?'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

async function getReport(token: string) {
  const [rows] = await pool.execute<AssessmentRow[]>(
    `SELECT a.id, a.health_score, a.health_score_class, a.profile_name, a.pillar_scores, a.report_content, l.name AS lead_name
     FROM assessments a
     JOIN leads l ON l.id = a.lead_id
     WHERE a.report_token = ?
     LIMIT 1`,
    [token]
  )
  return rows[0] ?? null
}

function StatusState({ title, message }: { title: string; message: string }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: 'linear-gradient(160deg, #0D2B2B 0%, #0f3333 60%, #164646 100%)' }}
    >
      <div
        className="rounded-2xl p-8 max-w-md text-center"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
      >
        <p className="font-sora font-bold text-white" style={{ fontSize: '1.2rem' }}>
          {title}
        </p>
        <p className="font-inter text-sm mt-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
          {message}
        </p>
      </div>
    </div>
  )
}

export default async function RelatorioPage({ params }: { params: { token: string } }) {
  const row = await getReport(params.token)

  if (!row) {
    return (
      <StatusState
        title="Relatório não encontrado"
        message="Verifique se o link que você recebeu está completo e correto."
      />
    )
  }

  if (!row.report_content) {
    return (
      <StatusState
        title="Seu relatório está sendo preparado"
        message="Isso leva só alguns instantes. Tente atualizar a página em breve."
      />
    )
  }

  return (
    <RelatorioClient
      healthScore={row.health_score}
      healthScoreClass={row.health_score_class}
      pillarScores={JSON.parse(row.pillar_scores)}
      reportPillars={JSON.parse(row.report_content)}
      whatsappUrl={WHATSAPP_URL}
    />
  )
}

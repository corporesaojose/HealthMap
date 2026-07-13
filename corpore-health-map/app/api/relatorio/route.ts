import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/db/pool'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST(req: NextRequest) {
  const apiKey = req.headers.get('x-api-key')
  if (!process.env.REPORT_API_SECRET || apiKey !== process.env.REPORT_API_SECRET) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const { assessId, pillars } = body

  if (!assessId || !Array.isArray(pillars)) {
    return NextResponse.json({ success: false, error: 'assessId e pillars são obrigatórios' }, { status: 400 })
  }

  try {
    const [result] = await pool.execute(
      'UPDATE assessments SET report_content = ?, report_generated_at = NOW() WHERE id = ?',
      [JSON.stringify(pillars), assessId]
    )
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((result as any).affectedRows === 0) {
      return NextResponse.json({ success: false, error: 'Assessment não encontrado' }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao salvar relatório:', error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}

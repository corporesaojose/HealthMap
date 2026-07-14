import { NextRequest, NextResponse } from 'next/server'
import mysql from 'mysql2/promise'
import { randomUUID } from 'crypto'
import { pool } from '@/lib/db/pool'
import { IPM_OBSTACLES } from '@/lib/health-map/questions'

function obstacleLabels(values: string[] | undefined): string | null {
  if (!values || values.length === 0) return null
  return values
    .map(v => IPM_OBSTACLES.find(o => o.value === v)?.label ?? v)
    .join(', ')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST(req: NextRequest) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const { registration, result, pillarAnswers, ipm } = body

  let conn: mysql.PoolConnection
  try {
    conn = await pool.getConnection()
  } catch (error) {
    console.error('DB connection error:', error)
    return NextResponse.json({ success: false, error: 'DB connection failed: ' + String(error) }, { status: 500 })
  }

  try {
    const [leadResult] = await conn.execute(
      'INSERT INTO leads (name, phone, email, neighborhood, activity_level) VALUES (?, ?, ?, ?, ?)',
      [registration.name, registration.phone, registration.email, registration.neighborhood, registration.activityLevel]
    )
    const leadId = (leadResult as mysql.ResultSetHeader).insertId

    const reportToken = randomUUID()

    const insertSql = 'INSERT INTO assessments (lead_id, health_score, health_score_class, ipm, ipm_class, imc, imc_class, profile_id, profile_name, pillar_scores, strongest_pillar, weakest_pillar, priority_pillar, age, report_token, ipm_readiness, ipm_confidence, ipm_obstacles, ipm_future, ipm_mental_fatigue) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    const [assessResult] = await conn.execute(insertSql, [
      leadId,
      result.healthScore,
      result.healthScoreClass,
      result.ipm,
      result.ipmClass,
      result.imc,
      result.imcClass,
      result.profile.id,
      result.profile.name,
      JSON.stringify(result.pillarScores),
      result.strongestPillar.name,
      result.weakestPillar.name,
      result.priorityPillar.name,
      result.age,
      reportToken,
      ipm?.readiness ?? null,
      ipm?.confidence ?? null,
      obstacleLabels(ipm?.obstacles),
      ipm?.future ?? null,
      ipm?.mentalFatigue ?? null,
    ])
    const assessId = (assessResult as mysql.ResultSetHeader).insertId

    // Salvar respostas individuais por pilar
    if (pillarAnswers && Array.isArray(pillarAnswers)) {
      for (const pa of pillarAnswers) {
        await conn.execute(
          'INSERT INTO pillar_answers (assessment_id, pillar_name, pillar_display_name, question_index, question_text, option_label, score) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [assessId, pa.pillarName, pa.pillarDisplayName, pa.questionIndex, pa.questionText, pa.optionLabel, pa.score]
        )
      }
    }

    return NextResponse.json({ success: true, leadId, assessId, reportToken })
  } catch (error) {
    console.error('DB query error:', error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  } finally {
    conn.release()
  }
}

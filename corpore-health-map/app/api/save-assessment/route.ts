import { NextRequest, NextResponse } from 'next/server'
import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false },
  waitForConnections: true,
  connectionLimit: 5,
})

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const { registration, result } = body as { registration: Record<string, string>; result: Record<string, unknown> & { profile: { id: string; name: string }; strongestPillar: { name: string }; weakestPillar: { name: string }; priorityPillar: { name: string } } }

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

    const [assessResult] = await conn.execute(
      `INSERT INTO assessments
        (lead_id, health_score, health_score_class, ipm, ipm_class, imc, imc_class,
         profile_id, profile_name, pillar_scores, strongest_pillar, weakest_pillar, priority_pillar, age)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
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
      ]
    )
    const assessId = (assessResult as mysql.ResultSetHeader).insertId

    return NextResponse.json({ success: true, leadId, assessId })
  } catch (error) {
    console.error('DB query error:', error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  } finally {
    conn.release()
  }
}

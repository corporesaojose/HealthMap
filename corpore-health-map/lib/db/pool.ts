import mysql from 'mysql2/promise'
import { readFileSync } from 'fs'
import path from 'path'

const CONFIG_ENV_PATH = '/home/u446706325/domains/healthmap.corporetraininggym.com.br/hbuilds/config/.env'

function loadFileEnv(): Record<string, string> {
  try {
    console.error('[DIAG] cwd =', process.cwd())
    console.error('[DIAG] __dirname =', __dirname)
    try {
      const pkg = readFileSync(path.join(process.cwd(), 'package.json'), 'utf8')
      console.error('[DIAG] in-dir read OK, package.json length =', pkg.length)
    } catch (e) {
      console.error('[DIAG] in-dir read FAILED:', String(e))
    }
    const raw = readFileSync(CONFIG_ENV_PATH, 'utf8')
    console.error('[DIAG] out-of-dir read OK, length =', raw.length)
    const out: Record<string, string> = {}
    for (const line of raw.split('\n')) {
      const idx = line.indexOf('=')
      if (idx === -1) continue
      const key = line.slice(0, idx).trim()
      const value = line.slice(idx + 1).trim()
      if (key) out[key] = value
    }
    return out
  } catch (e) {
    console.error('[DIAG] out-of-dir read FAILED:', String(e))
    return {}
  }
}

const fileEnv = loadFileEnv()

function getEnvVar(key: string): string | undefined {
  const v = process.env[key] || fileEnv[key] || undefined
  console.error(`[DIAG] getEnvVar(${key}) => ${v ? 'set(' + v.length + ')' : 'MISSING'}`)
  return v
}

let _pool: mysql.Pool | null = null

export function getPool() {
  if (!_pool) {
    const DB_SOCKET = getEnvVar('DB_SOCKET')
    _pool = mysql.createPool({
      ...(DB_SOCKET
        ? { socketPath: DB_SOCKET }
        : {
            host: getEnvVar('DB_HOST'),
            port: parseInt(getEnvVar('DB_PORT') || '3306'),
            ssl: { rejectUnauthorized: false },
          }),
      user: getEnvVar('DB_USER'),
      password: getEnvVar('DB_PASSWORD'),
      database: getEnvVar('DB_NAME'),
      waitForConnections: true,
      connectionLimit: 5,
    })
  }
  return _pool
}

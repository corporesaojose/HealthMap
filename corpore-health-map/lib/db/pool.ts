import mysql from 'mysql2/promise'
import { readFileSync } from 'fs'

function getEnvVar(key: string): string | undefined {
  if (process.env[key]) return process.env[key]
  try {
    const raw = readFileSync('/proc/self/environ', 'utf8')
    const match = raw.split('\0').find(v => v.startsWith(key + '='))
    return match ? match.slice(key.length + 1) : undefined
  } catch {
    return undefined
  }
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

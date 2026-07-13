import mysql from 'mysql2/promise'

export const pool = mysql.createPool({
  ...(process.env.DB_SOCKET
    ? { socketPath: process.env.DB_SOCKET }
    : { host: process.env.DB_HOST, port: parseInt(process.env.DB_PORT || '3306'), ssl: { rejectUnauthorized: false } }),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 5,
})

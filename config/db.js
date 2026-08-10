import { configDotenv } from 'dotenv';
import { Pool, Query } from 'pg';
configDotenv()

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

export const db = {
    query: (text, params) => pool.query(text, params)
}
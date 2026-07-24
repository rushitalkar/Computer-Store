import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import * as schema from "./schema"
import dotenv from "dotenv"

dotenv.config()

if (!process.env.DB_URL) {
    throw new Error("Database URL is not set in environment variables")
}

const pool = new Pool({ connectionString: process.env.DB_URL })

pool.on("error", (err) => {
    console.error(err)
})

export const db = drizzle(pool, { schema })


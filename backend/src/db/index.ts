import {drizzle} from "drizzle-orm/postgres-js"
import { Pool } from "pg"
import * as schema from "./schema"
import dotenv from "dotenv"

dotenv.config()
if (!process.env.DB_URL) {
    throw new Error("Database is not set in Envirnment Variables")

}

const pool = new Pool({connectionString : process.env.DB_URL})

pool.on("error",(err)=>{
    console.log(err)
})

export const db = drizzle({client : pool , schema})


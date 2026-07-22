import express, { urlencoded } from "express"
import dotenv from "dotenv"
import { clerkMiddleware } from '@clerk/express'
import cors from "cors"

const app = express()

app.use(clerkMiddleware())
app.use(cors({origin : "http://localhost:5173"}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
dotenv.config()

app.get("/", (req,res)=>{
    res.json({
    message: "Welcome to Productify API - Powered by PostgreSQL, Drizzle ORM & Clerk Auth",
    endpoints: {
      users: "/api/users",
      products: "/api/products",
      comments: "/api/comments",
    },
  })
})

app.listen(process.env.PORT,()=> console.log("Server is Running"));
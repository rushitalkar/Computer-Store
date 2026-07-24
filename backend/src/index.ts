import express, { urlencoded } from "express"
import dotenv from "dotenv"
import { clerkMiddleware } from '@clerk/express'
import cors from "cors"
import userRoutes from "./routes/userRoutes"
import productRoutes from "./routes/productRoutes"
import commentRoutes from "./routes/commentRoutes"
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

app.use("/api/users",userRoutes)
app.use("/api/products",productRoutes)
app.use("/api/comments",commentRoutes)

app.listen(process.env.PORT,()=> console.log("Server is Running"));
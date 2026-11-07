import express from 'express'
import 'dotenv/config'
import cors from "cors"
import { clerkMiddleware } from '@clerk/express'
import aiRouter from './routes/aiRoutes.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoutes.js'


const app = express()

await connectCloudinary()

app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())

app.use("/api/ai", aiRouter)
app.use("/api/user", userRouter)

app.get("/", (req, res) => res.send("API working"))

// const PORT = process.env.PORT || 3000

// app.listen(PORT, () => console.log("Server running on port", PORT))
export default app
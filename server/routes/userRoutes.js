import express from 'express'
import { auth } from '../middlewares/auth.js'
import { getCreations, getPublishedCreations, likeCreations } from '../controllers/userControllers.js'

const userRouter = express.Router()


userRouter.get("/get-user-creations", auth, getCreations)
userRouter.get("/get-published-creations", auth, getPublishedCreations)
userRouter.post("/toggle-like-creation", auth, likeCreations)

export default userRouter
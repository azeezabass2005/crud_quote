import express from 'express'
import { createUser, handleLogin, handleUpdateUser } from '../controllers/auth'

const router = express.Router()

router.post("/register", createUser)

router.post("/login", handleLogin)

router.patch("/update-info", handleUpdateUser)

export default router
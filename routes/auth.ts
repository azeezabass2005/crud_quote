import express from 'express'
import { createUser, handleLogin } from '../controllers/auth'

const router = express.Router()

router.post("/register", createUser)

router.post("/login", handleLogin)

export default router
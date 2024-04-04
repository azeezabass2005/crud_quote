import express from 'express'
import { handleImageUpload } from '../services/image-upload'
import { verifyRole } from '../middlewares/verify-role'

const router = express.Router()

router.post("/", verifyRole(["Admin"]), handleImageUpload)

export default router
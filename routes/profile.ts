import express from "express"
import { handleGetProfile, handleUpdateUserProfile } from "../controllers/profile"

const router = express.Router()

router.get("/", handleGetProfile)

router.patch("/", handleUpdateUserProfile)

export default router
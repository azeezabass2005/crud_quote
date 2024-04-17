import express from 'express'
import { createAddress, getAllAddress, handleUpdateAddress } from '../controllers/address'

const router = express.Router()

router.post("/", createAddress)

router.get("/", getAllAddress)

router.patch("/", handleUpdateAddress)

export default router
import express, { Request, Response } from 'express'
import { verifyRole } from '../middlewares/verify-role'
import { CustomRequest } from '../middlewares/verify-jwt'

const router = express.Router()

router.get("/", verifyRole(["Admin"]), (req: Request, res: Response) => {
  console.log("user can access the protected route")
  return res.send(`User can access the protected route`)
})


export default router
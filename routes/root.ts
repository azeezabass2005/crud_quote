import express, { Request, Response } from 'express'

const router = express.Router()

router.get("/",(req: Request, res: Response) => {
  console.log("user can access the protected route")
  return res.send(`User can access the protected route`)
})

export default router
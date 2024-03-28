import express from 'express'

const router = express.Router()

router.get("*", (req, res) => {
  res.status(404).json({"message": "The route you are looking for does not exist"})
})

export default router
import express, { Application, Request, Response } from 'express'
import 'dotenv/config'
import notfoundRouter from './routes/not-found'
import authRouter from './routes/auth'
import protectedRouter from './routes/root'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import { verifyJWT } from './middlewares/verify-jwt'
import uploadRouter from './routes/upload'

const app: Application = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
// app.use(cors({ origin: * }))

app.get("/", (req: Request, res: Response) => {
  console.log(req)
  res.status(200).json({"message": "This is the quote crud home"})
})

app.use("/auth", authRouter)

app.use(verifyJWT)

app.use("/upload", uploadRouter)


app.use("/protected-route", protectedRouter)

app.use("*", notfoundRouter)

const port: string = process.env.PORT!

const startApp = async () => {
  try {
    const connect = await mongoose.connect(process.env.DATABASE_URI!)
    if(connect) {
      console.log("connected to the database")
      app.listen(port, () => console.log(`Server listening on port: ${port}`))
    } else {
      console.log("unable to connect to database")
    }
  } catch (error) {
    throw error
  }
}
startApp()
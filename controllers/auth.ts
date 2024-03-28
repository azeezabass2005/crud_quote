import { Request, Response } from "express";
import UserModel, { UserDocumentInt } from "../model/user";
import bcrypt from 'bcryptjs'
import { createUserService } from "../services/auth";
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const createUser = async (req: Request, res: Response) => {
  console.log(req.body)
  const { firstName, lastName, email, password }: UserDocumentInt = req.body
  if(!firstName || !lastName || !email || !password) {
    return res.status(400).json({"message": "All credentials is required to create account"})
  }
  const userAlreadyExists = await UserModel.findOne({ email: email })
  if(userAlreadyExists) {
    return res.status(409).json({"message": "User with email already exists"})
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = await createUserService({ firstName: firstName, lastName: lastName, email: email, password: hashedPassword })
  if(!newUser) {
    return res.status(400).json({"message": "Failed to register user"})
  }
  const accessToken = jwt.sign({ _id: newUser?._id, name: newUser?.firstName }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '7 days' })
  const responseData = { ...newUser, token: accessToken }
  console.log(responseData)
  return res.status(201).send(responseData)
}

export const handleLogin = (req: Request, res: Response) => {
  console.log(req.body)
  return res.json({"message": "This is the route to login"})
}
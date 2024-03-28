import { Request, Response } from "express";
import UserModel, { UserDocumentInt } from "../model/user";
import bcrypt from 'bcryptjs'
import { createUserService } from "../services/auth";

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
  const newUser = createUserService({ firstName: firstName, lastName: lastName, email: email, password: hashedPassword })
  if(!newUser) {
    return res.status(400).json({"message": "Failed to register user"})
  }
  console.log(newUser)
  return res.status(201).send({"message": "User successfully registered"})
}

export const handleLogin = (req: Request, res: Response) => {
  console.log(req.body)
  return res.json({"message": "This is the route to login"})
}
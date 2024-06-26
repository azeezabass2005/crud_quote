import { Request, Response } from "express";
import UserModel, { UserDocumentInt } from "../model/user";
import bcrypt from 'bcryptjs'
import { createUserService } from "../services/auth";
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const createUser = async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    const { firstName, lastName, email, password, role }: UserDocumentInt = req.body
    if(!firstName || !lastName || !email || !password) {
      return res.status(400).json({"message": "All credentials is required to create account"})
    }
    const userAlreadyExists = await UserModel.findOne({ email: email })
    if(userAlreadyExists) {
      return res.status(409).json({"message": "User with email already exists"})
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await createUserService({ firstName: firstName, lastName: lastName, email: email, password: hashedPassword, role: role })
    if(!newUser) {
      return res.status(400).json({"message": "Failed to register user"})
    }
    const accessToken = jwt.sign({ _id: newUser?._id, name: newUser?.firstName, role: newUser.role }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '7 days' })
    const responseData = { ...newUser, token: accessToken }
    console.log(responseData)
    return res.status(201).send(responseData)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const handleLogin = async (req: Request, res: Response) => {
 try{
  console.log(req.body)

  const { email, password }: { email: string, password: string } = req.body
  if(!email || !password) {
    return res.status(400).json({"message": "All credentials is required to login"})
  }
  const userAlreadyExists = await UserModel.findOne({ email: email })
  if(!userAlreadyExists) {
    return res.status(400).json({"message": "User with email not found"})
  }
  const passwordMatch = bcrypt.compareSync(password, userAlreadyExists.password)
  if(!passwordMatch) {
    return res.status(400).json({"message": "Incorrect password"})
  }
  const accessToken = jwt.sign({ _id: userAlreadyExists._id, name: userAlreadyExists.firstName, role: userAlreadyExists.role }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '7 days' })
  const responseData = { user: {
    _id: userAlreadyExists._id,
    firstName: userAlreadyExists.firstName,
    lastName: userAlreadyExists.lastName,
    email: userAlreadyExists.email,
    role: userAlreadyExists.role,
  }, token: accessToken }
  console.log(responseData)
  return res.status(200).send(responseData)
 } catch (error) {
  console.log(error)
  throw error
 }
}

export const handleUpdateUser = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName } = req.body
    if(!email && !password && !firstName && !lastName) {
      return res.status(400).json({"message": "Credentials are required to update user"})
    }
    const userAlreadyExists = await UserModel.findOne({ email: email })
    if(!userAlreadyExists) {
      return res.status(400).json({"message": "User does not exist"})
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const updatedUserData = await UserModel.findByIdAndUpdate(userAlreadyExists._id, { email: email, password: hashedPassword, firstName: firstName, lastName: lastName })
    const responseData = {
      user: {
        _id: updatedUserData?._id,
        email: updatedUserData?.email,
        firstName: updatedUserData?.firstName,
        lastName: updatedUserData?.lastName
      }
    }
    return res.status(200).send(responseData)
  } catch (error) {
    console.log(error)
    throw error
  }
}
import { Request, Response } from "express"
import { CustomRequest } from "../middlewares/verify-jwt"
import UserModel from "../model/user"
import bcrypt from 'bcryptjs'

export const handleGetProfile = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const user = (req as CustomRequest)?.token?.user
    console.log(user)
    if(!user) {
      return res.status(400).json({"message": "Failed to get profile for user"})
    }
    const userExists = UserModel.findById(user)
    if(!userExists) {
      return res.status(400).json({"message": "User does not exist"})
    }
    return res.status(200).send(userExists)
  } catch(error) {
    console.log(error)
    throw error
  }
}


export const handleUpdateUserProfile = async (req: Request, res: Response) => {
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
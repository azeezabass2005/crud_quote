import { Response } from "express"
import { CustomRequest } from "../middlewares/verify-jwt"
import UserModel from "../model/user"
import AddressModel from "../model/address"

export const createAddress = async (req: CustomRequest, res: Response) => {
  const { address } = req.body
  // @ts-ignore
  const user = req?.token?._id
  console.log(user)
  if(!address) {
    return res.status(400).json({"message": "Address is required"})
  }
  const userExists = await UserModel.findById(user)
  if(!userExists) {
    return res.status(400).json({"message": "Cannot create address for non-existent user"})
  }
  const userAddressExceedsTwo = userExists.deliveryAddress.length >= 2
  if(userAddressExceedsTwo) {
    return res.status(400).json({"message": "User address cannot exceed 2"})
  }
  const newAddress = AddressModel.create({ address: address, user: user })
  return res.status(200).json(newAddress)
}

export const getAllAddress = async (req: CustomRequest, res: Response) => {
  // @ts-ignore
  const user = req?.token?._id
  const userExists = UserModel.findById(user)
  if(!userExists) {
    return res.status(400).json({"message": "User doesn't exist"})
  }
  const allAddress = await AddressModel.find({ user: user })
  if(!allAddress) {
    return res.status(500).json({"message": "An unexpected error occured"})
  }
  return res.status(200).send(allAddress)
}
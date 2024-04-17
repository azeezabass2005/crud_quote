import { Request, Response } from "express"
import { CustomRequest } from "../middlewares/verify-jwt"
import UserModel from "../model/user"
import AddressModel from "../model/address"

export const createAddress = async (req: Request, res: Response) => {
  const { address } = req.body
  // @ts-ignore
  const user = (req as CustomRequest)?.token?._id
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

export const handleUpdateAddress = async (req: Request, res: Response) => {
  const { address, addressId } = req?.body
  //@ts-ignore
  const user = (req as CustomRequest)?.token?._id
  if(!address || !addressId) {
    return res.status(400).json({"message": "All credentials is required to update address"})
  }
  const addressExist = await AddressModel.findById(addressId)
  if(!addressExist) {
    return res.status(400).json({"message": "You cannot edit a non-existing address"})
  }
  const userExists = await UserModel.findById(user)
  if(!userExists) {
    return res.status(400).json({"message": "User does not exist"})
  }
  const userExistsWithAddress = userExists.deliveryAddress.includes(addressId)
  if(!userExistsWithAddress) {
    return res.status(400).json({"message": "Failed to edit the address"})
  }
  const updatedAddress = await AddressModel.findByIdAndUpdate(addressId, { address: address })
  if(updatedAddress) {
    return res.status(500).json({"message": "An unexpected error occured"})
  }
  return res.status(200).send(updatedAddress)

}

export const getAllAddress = async (req: Request, res: Response) => {
  // @ts-ignore
  const user = (req as CustomRequest)?.token?._id
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
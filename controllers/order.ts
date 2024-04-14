import { Response } from "express";
import { CustomRequest } from "../middlewares/verify-jwt";
import ProductModel, { VariationModel } from "../model/product";
import OrderModel from "../model/order";
import UserModel from "../model/user";

export const handleCreateOrder = async (req: CustomRequest, res: Response) => {
  try {
    const { quantity, paymentStatus, paymentType, orderStatus, deliveryAddress, productId, variationId } = req.body
    //@ts-ignore
    const user = req?.token?._id
    console.log(user)
    if(!quantity || !paymentStatus || !paymentType || !orderStatus || !deliveryAddress || !productId || !variationId) {
      return res.status(400).json({"message": "All credentials is required"})
    }
    const productExist = await ProductModel.findById(productId)
    if(!productExist) {
      return res.status(400).json({"message": "Invalid Product"})
    }
    const variationExist = await VariationModel.findById(variationId)
    if(!variationExist)  {
      return res.status(400).json({"message": "Invalid Product variant"})
    } else if(variationExist?.quantityAvailable > quantity) {
      return res.status(400).json({"message": "Quantity available not enough"})
    }
    const newOrder = await OrderModel.create({ product: productId, variation: variationId, user: user, quantity: quantity, paymentStatus: paymentStatus, paymentType: paymentType, orderStatus: orderStatus, deliveryAddress: deliveryAddress })
    if(!newOrder) {
      return res.status(500).json({"message": "something went wrong"})
    }
    return res.status(201).send(newOrder)

  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}

export const handleGetAllOrdersByUser = async (req: CustomRequest, res: Response) => {
  try {
    // @ts-ignore
    const user = req.token._id
    if(!user) {
      return res.status(400).json({"message": "User does not exist"})
    }
    const userData = await UserModel.findById(user)
    if(!userData) {
      return res.status(400).json({"message": "User does not exist"})
    }
    return res.status(200)
  } catch(error) {
    return res.status(500).json({"message": "Something went wrong"})
  }
}
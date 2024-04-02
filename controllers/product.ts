import { Response } from "express";
import ProductModel from "../model/product";
import { CustomRequest } from "../middlewares/verify-jwt";


export const handleCreateProduct = async (req: CustomRequest, res: Response) => {
  try {
    const { name, description, variations } = req.body
    // @ts-ignore
    const user = req?.token?._id
    if(!user) {
      return res.status(401).json({"message": "UnAuthorized"})
    }
    if(!name || !description || !variations) {
      return res.status(400).json({"message": "All credentials are required to create a product"})
    }
    const newProduct = ProductModel.create({
      user: user,
      name: name,
      description: description,
      variations: variations
    })
    if(!newProduct) {
      return res.status(400).json({"message": "Failed to create product"})
    }
    return res.status(201).send(newProduct)
  } catch (error) {
    console.log(error)
    throw error
  }
}
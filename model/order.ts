import mongoose from "mongoose";

interface OrderSchemaType extends mongoose.Document {
  product: mongoose.Schema.Types.ObjectId,
  variation: mongoose.Schema.Types.ObjectId,
  user: mongoose.Schema.Types.ObjectId,
  quantity: string,
  paymentStatus: "Paid" | "Not Paid",
  paymentType: "Card" | "Remita" | "Stripe",
  orderStatus: "Received" | "Pending Payment" | "Payment Processing" | "Partially Shipped" | "Shipped" | "Out for Delivery" | "Delivered" | "On Hold" | "Cancelled" | "Returned" | "Refunded",
  deliveryAddress: string,
  updatedAt: string,
  createdAt: string
}

const orderScehma: mongoose.Schema<OrderSchemaType> = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  variation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Variation',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  quantity: { type: String, required: true },
  paymentStatus: { type: String, required: true },
  paymentType: { type: String, required: true },
  orderStatus: { type: String, required: true },
  deliveryAddress: { type: String, required: true }
}, { timestamps: true })

const OrderModel = mongoose.model("Order", orderScehma)

export default OrderModel
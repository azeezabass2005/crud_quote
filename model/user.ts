import mongoose from "mongoose";

export interface UserDocumentInt extends mongoose.Document {
  firstName: string,
  lastName: string,
  password: string,
  email: string,
  deliveryAddress: string,
  orders: string[],
  role: string[],
  createdAt: string,
  updatedAt: string,
}

const userSchema: mongoose.Schema<UserDocumentInt> = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  deliveryAddress: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address"
    }
  ],
  role: {
    type: [String],
    required: true,
    default: ["User"]
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order"
    }
  ]
}, { timestamps: true })

const UserModel = mongoose.model('User', userSchema)

export default UserModel
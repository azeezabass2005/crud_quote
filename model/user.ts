import mongoose from "mongoose";

export interface UserDocumentInt extends mongoose.Document {
  firstName: string,
  lastName: string,
  password: string,
  email: string,
  createdAt: string,
  updatedAt: string,

}

const userSchema: mongoose.Schema<UserDocumentInt> = new mongoose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
}, { timestamps: true })

const UserModel = mongoose.model('User', userSchema)

export default UserModel
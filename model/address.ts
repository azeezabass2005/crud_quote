import mongoose from "mongoose";

interface AddressDocumentInt extends mongoose.Document {
  address: string,
  user: mongoose.Schema.Types.ObjectId
}

const addressSchema = new mongoose.Schema({
  address: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, required: true }
}, { timestamps: true })

const AddressModel = mongoose.model("Address", addressSchema)

export default AddressModel
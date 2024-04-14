import mongoose from "mongoose";

interface Size extends mongoose.Document {
  name: string,
  abbreviation: string,
}

const sizeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  abbreviation: {
    type: String
  }
});

interface Variation extends mongoose.Document {
  size?: string
  color?: string;
  price: number;
  quantityAvailable: number;
  image: string[]
}

const variationSchema = new mongoose.Schema<Variation>({
  size: sizeSchema,
  color: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  quantityAvailable: {
    type: Number,
    required: true
  },
  image: {
    type: [String],
    require: true
  }
});

export const VariationModel = mongoose.model("Variation", variationSchema)

interface Product extends mongoose.Document {
  user: mongoose.Schema.Types.ObjectId,
  name: string;
  description?: string;
  variations: Variation[];
}

const productSchema = new mongoose.Schema<Product>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  // Other product details...
  variations: [variationSchema]
});

const ProductModel = mongoose.model<Product>('Product', productSchema);

export default ProductModel

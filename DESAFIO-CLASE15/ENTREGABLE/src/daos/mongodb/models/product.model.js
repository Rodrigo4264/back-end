import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  // id: { type: Number, required: true, unique: true },
  title: { type: String, required: true, max: 100 },
  description: { type: String, required: true, max: 100 },
  price: { type: Number, required: true },
  category: { type: String, required: true, max: 100 },
  code: { type: String, required: true, max: 100, unique: true },
  stock: { type: Number, required: true },
  thumbnails: { type: Array, required: true },
  status: { type: Boolean, required: true },
});

export const ProductModel = mongoose.model("products", productSchema);

import { Schema, Model } from "mongoose";
import { ProductCart, Cart } from '../interfaces/cart';

import mongoose from "mongoose";

export const productCartSchema: Schema<ProductCart> = new Schema<ProductCart>({
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const cartSchema: Schema<Cart> = new Schema<Cart>({
  userId: { type: String, required: true },
  products: { type: [productCartSchema], required: true }, 
});

export const  CartModel: Model<Cart> = mongoose.model<Cart>('cart', cartSchema)




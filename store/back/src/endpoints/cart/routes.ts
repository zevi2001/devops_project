import express from "express";
import cartController from "./controllers";

const cartRoute = express.Router();

cartRoute.get('/:userId', cartController.getCart);

cartRoute.patch('/', cartController.updateQuantity);

cartRoute.post('/:id', cartController.addProduct);

cartRoute.delete('/:userId', cartController.deleteCart);

cartRoute.delete('/', cartController.deleteProductInCart);

export default cartRoute
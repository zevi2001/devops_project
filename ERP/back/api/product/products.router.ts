import express from "express";
import productController from "./products.controller";
import shopController from "../externalEndPoint/products.controller"

const router = express.Router();

router.get(`/shop_inventory`, shopController.getAllProductsOut);
router.get('/shop_inventory/:productId', shopController.getProductById);
router.post('/shop_inventory/:productId', shopController.updateProductQuantity);


import { authenticateToken } from "./middleware";

router.use(authenticateToken);

router.post('/inventory', productController.addNewInventoryItem)

router.get('/inventory', productController.getAllInventory);

router.get('/inventory/:productId', productController.getInventoryById);

router.patch('/inventory/:productId', productController.updateInventoryItem);

router.delete('/inventory/:productId', productController.deleteInventoryItem);

export default router;
import express from "express"
import ordersController from "./controller"

const route = express.Router()

route.post("/", ordersController.createOrder)
route.get("/:userId", ordersController.getUserOrders)

export default route  
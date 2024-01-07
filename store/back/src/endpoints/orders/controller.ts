import { Response, Request } from "express";
import ordersServices from "./services"

const createOrder = async (req: Request, res: Response)=> {
    try {
        const order = req.body
        console.log(order);
        const response = await ordersServices.createOrder(order)
        console.log("order controller try "+response);
        
        res.status(200).json(response)
    } catch (error) {
        console.log("order controller catch "+error);
        res.status(404).send(error)
    }
}
  
const getUserOrders = async (req: Request, res: Response)=> {
    try {
        const {userId} = req.params
        const response = await ordersServices.getUserOrders(userId)
        res.status(200).json(response)
    } catch (error) {
        res.status(404).send(error)
    }
}

export default {
    createOrder,
    getUserOrders
}
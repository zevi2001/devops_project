import axios from "axios";
import { BASE_URL } from "./usersServices";
import { OrderInterface } from "../interfaces/ordersInterface";
import { handleUnAxiosError } from "./usersServices";

export async function fetchOrders(): Promise<OrderInterface[] | void> {
  try {
    const config = {
      headers: {
        'access_token': localStorage.getItem('access_token') || "token not found" 
      }
    };
    const fullUrl = `${BASE_URL}/orders`;
    const response = await axios.get(fullUrl, config);
    return response.data;
  } catch (error) {
    handleUnAxiosError(error);
  }
}
export async function putOrder(order:OrderInterface): Promise<OrderInterface | void> {
  try {
    const config = {
      headers: {
        'access_token': localStorage.getItem('access_token') || "token not found" 
      }
    };
    const fullUrl = `${BASE_URL}/orders/${order._id}`;
    const response = await axios.put(fullUrl,order, config);
    return response.data;
  } catch (error) {
    handleUnAxiosError(error);
  }
}

import axios from "axios";
import dotenv from "dotenv"

dotenv.config()

const OMS_SERVER = "http://localhost/store/api" || "http://127.0.0.1/store/api"

const createOrder = async (order: any) => {
  try {
    const resp = await axios.post(
      `${OMS_SERVER}/orders/`,
      order
    );
    console.log("order service try ")
    return resp.data;
  } catch (error) {
    console.log("order service catch " +error);
  }
};

const getUserOrders = async (userId: any) => {
    try {
      const resp = await axios.get(
        `${OMS_SERVER}/orders/${userId}`,
      );
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  };

export default {
  createOrder,
  getUserOrders
};

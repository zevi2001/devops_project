import axios from "axios";
import dotenv from "dotenv"

dotenv.config()

const BANNERS_SERVER = process.env.BANNERS_SERVER || "https://serverbanners.onrender.com"

const getByCategory = async(category: string)=> {
 try {
    const resp = await axios.get(`${BANNERS_SERVER}/banners/cat/${category}`)
    return resp.data
 } catch (error) {
    console.log(error);  
 }
}

const getAllBanners = async()=> {
    try {
       const resp = await axios.get(`${BANNERS_SERVER}/banners/`)
       return resp.data
    } catch (error) {
       console.log(error);
    }
   }

export default {
    getByCategory,
    getAllBanners
}
import mongoose from "mongoose";
import dotenv from 'dotenv'
import UserModel from "../api/users/usersSchema";

dotenv.config()
let uri = process.env.MONGO_DB_URI || "uri not defined"
export async function connectToMongoDB() {
  console.log(uri);
  
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
    const u=await UserModel.find({});
    console.log(u);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export async function disconnectFromMongoDB() {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
  }
}
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("Connection established");
  });
  await mongoose.connect(`${process.env.MONGODB_URI}/IamGrooveDB`);
};
export default connectDB;

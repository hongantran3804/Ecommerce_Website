import mongoose from "mongoose";
let isConnected = false; //track the connection

export const connectToDB = async () => {
  mongoose.set("strictQuery");
  if (isConnected) {
    console.log("Connected Mongoose");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "lacaco",
    });
    console.log("Mongodb connected");
  } catch (error) {
    console.log("Mongodb is not connected")
  }
};

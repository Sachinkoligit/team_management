import mongoose from "mongoose";

export const Connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("db created");
  } catch (error) {
    console.log(error);
  }
};

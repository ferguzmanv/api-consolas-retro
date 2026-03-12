import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(process.env.MONGODB_URI);
    console.log("conectado a MOngoDB");
  } catch (error) {
    console.error("error al conectar a MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;

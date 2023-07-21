import mongoose from "mongoose";

export async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected to Database...");
    });
    connection.on("erorr", (error) => {
      console.log(error);
    });
  } catch (error) {
    console.log("Something went wrong!");
    console.log(error);
  }
}

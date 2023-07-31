import mongoose from "mongoose";
import dotenv from "dotenv";



const connectionString = `mongodb+srv://crausazr:Colmillo123@cluster0.fvhewcg.mongodb.net/Cluster0?retryWrites=true&w=majority`;

try {
  await mongoose.connect(connectionString);
  console.log("Connection to MongoDB successful");
} catch (error) {
  console.log(error);
}

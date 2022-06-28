import express from "express";
const app = express();
import mongoose from "mongoose";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute.js";
import hotelRoute from "./routes/hotelRoute.js";
import roomRoute from "./routes/roomRoute.js";
import userRoute from "./routes/userRoute.js";
import cors from "cors"
// mongo connection
async function main() {
  try {
    await mongoose.connect("mongodb://localhost:27017/bookingClone");
    console.log("Connected to MongoDB");
  } catch (e) {
    console.log(e);
  }
}
// middlewares
app.use(express.json());
app.use(cookieParser())
dotenv.config()
app.use(cors())
//routes
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/hotels", hotelRoute);
app.use("/rooms", roomRoute);

// error
app.use((err, req, res, next) => {
  const errorStatus = err.statusCode || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    message: errorMessage,
    stack: err.stack
  })
})


//server
app.listen(4000, () => {
  main()
  console.log("Server is running on port 4000");
});

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const hotelsRoute = require("./routes/hotels");

const roomsRoute = require("./routes/rooms");

const usersRoute = require("./routes/users");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(cookieParser());
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to db");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongodb disconnected");
});
mongoose.connection.on("connected", () => {
  console.log("mongodb connected");
});

//middlewares

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);

app.use("/api/hotels", hotelsRoute);

app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something Went Wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8000, () => {
  connectDB();
  console.log("connected to backend");
});

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connect } from "./config/connectDB.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

// Sample route
app.get("/", (req, res) => {
  res.send("API is running...");
});
connect()
// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authR.js';
import productRoutes from './routes/productR.js';
import cartRoutes from './routes/cartR.js';
import couponRoutes from './routes/couponR.js';
import paymentRoutes from './routes/paymentR.js';
import analyticsRoutes from './routes/analyticsR.js';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://e-commerce-frontend-8wg7.onrender.com",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "E-Commerce Backend API is running 🚀",
  });
});

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/coupon",couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);

app.listen(port , () => {
    console.log("Server is runnng http://localhost:"+port);
    connectDB();
})


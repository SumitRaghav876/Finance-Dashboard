import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

const app=express();
const port=process.env.PORT || 3000;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/transactions',transactionRoutes);
app.use('/api/v1/dashboard',dashboardRoutes);

app.use(errorHandler);

connectDB();

app.listen(port,()=>{
    console.log("app is listening on port:",port);
});

export default app;
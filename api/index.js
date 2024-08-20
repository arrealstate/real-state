import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import allRoutes from "./routes/all.route.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import offerRouter from "./routes/offer.route.js";
import listingwithouttoken from "./routes/listingwithouttoken.route.js";
import dashboardRoute from "./routes/dashboard.route.js";
import paymentPlanRoute from "./routes/paymentPlan.route.js";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

const app = express();

const port = process.env.PORT || 10000;

const __dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "*",
  credentials: true,
}));
app.use(cookieParser());

// MongoDB Connection
const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://arrealstate93:Ar103103$@cluster0.dic9t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit the process with an error
  }
};

connectToDatabase();

// Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.use("/api/offer", offerRouter);
app.use("/api/list", listingwithouttoken);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/all", allRoutes);
app.use("/api/paymentPlan", paymentPlanRoute);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// 404 Error handling
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: "Not Found",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});

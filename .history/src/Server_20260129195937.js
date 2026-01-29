import express from "express";
import dotenv from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";

dotenv.config();

const app = express();

// CRITICAL: Add middleware FIRST, before importing routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use()

// Connect to database
await connectDB();

// Import routes AFTER middleware is set up
import watchListRoutes from "./routes/watchListRoute.js";
import moviesRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// API routes
app.use("/movies", moviesRoutes);
app.use("/auth", authRoutes);
app.use("/watchlist", watchListRoutes);


const PORT = 5001;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// handle unhandled promise rejection (database connection error, etc.)
process.on("unhandledRejection", (err) => {
    console.error(`Unhandled Rejection: ${err.message}`);
    // Close server & exit process
    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    });
});

// handle uncaught exception error
process.on("uncaughtException", async (err) => {
    console.error(`Uncaught Exception: ${err.message}`);
    await disconnectDB();
    process.exit(1);
});

// graceful shutdown on SIGTERM signal
process.on("SIGTERM", async () => {
    console.log("SIGTERM signal received: closing server");
    server.close(async () => {
        await disconnectDB();
        process.exit(0);
    });   
});
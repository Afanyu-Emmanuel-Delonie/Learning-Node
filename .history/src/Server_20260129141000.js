import express from "express";
import dotenv from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";

// import routes 
import watchListRoutes from "./routes/watchListRoute.js";
import moviesRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

await connectDB();

const app = express();
app.use(express.json());

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
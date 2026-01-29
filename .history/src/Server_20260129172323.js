import express from "express";
import dotenv from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";

dotenv.config();

const app = express();

// CRITICAL: Middleware MUST be here, BEFORE connecting to DB and BEFORE routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
await connectDB();

// import routes AFTER app is created
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

// Error handlers
process.on("unhandledRejection", (err) => {
    console.error(`Unhandled Rejection: ${err.message}`);
    server.close(async () => {
        await disconnectDB();
        process.exit(1);
    });
});

process.on("uncaughtException", async (err) => {
    console.error(`Uncaught Exception: ${err.message}`);
    await disconnectDB();
    process.exit(1);
});

process.on("SIGTERM", async () => {
    console.log("SIGTERM signal received: closing server");
    server.close(async () => {
        await disconnectDB();
        process.exit(0);
    });   
});
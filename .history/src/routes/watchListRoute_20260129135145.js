import express from "express";
import { addToWatchList } from "../controllers/watchListController";

const router = express.Router();

// Register route
router.post("/", addToWatchList);

// Login route
router.post("/login", login);

// Logout route
router.post("/logout", logout);

export default router;
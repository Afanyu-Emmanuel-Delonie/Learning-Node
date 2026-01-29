import express from "express";
import { register, login, logout } from "../controllers/authController";

const router = express.Router();

// Register route
router.post("/", add);

// Login route
router.post("/login", login);

// Logout route
router.post("/logout", logout);

export default router;
import express from "express";
import { register, login, logout } from "../controllers/authController";

const router = express.Router();

// Register route
router.post("/register", register);
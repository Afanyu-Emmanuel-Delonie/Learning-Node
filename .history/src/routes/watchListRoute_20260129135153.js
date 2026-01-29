import express from "express";
import { addToWatchList } from "../controllers/watchListController";

const router = express.Router();

// watchlist route
router.post("/", addToWatchList);


export default router;
import express from "express";
import { addToWatchList } from "../controllers/watchListController.js";

const router = express.Router();

router.use
// watchlist route
router.post("/", addToWatchList);


export default router;
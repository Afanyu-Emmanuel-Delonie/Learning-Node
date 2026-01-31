import express from "express";
import { addToWatchList } from "../controllers/watchListController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

// watchlist route
router.post("/", addToWatchList);
router.delete("/:id");


export default router;
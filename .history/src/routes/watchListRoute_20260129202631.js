import express from "express";
import { addToWatchList, removeFromWatchList, updateWatchListItem } from "../controllers/watchListController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

// watchlist route
router.post("/", addToWatchList);
router.put("/:id", updateWatchListItem);
router.delete("/:id", removeFromWatchList);


export default router;
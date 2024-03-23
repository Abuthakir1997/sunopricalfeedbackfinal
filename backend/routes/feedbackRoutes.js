import express from "express";
import { sendFeedBack, getFeedBack, deleteFeedbacks } from "../controllers/feedBackControllers.js";
const router = express.Router();
router.get("/", getFeedBack);
router.post("/", sendFeedBack);
router.delete("/", deleteFeedbacks);
export default router;
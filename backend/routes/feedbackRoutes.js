import express from "express";
import { sendFeedBack, getFeedBack, deleteFeedbacks } from "../controllers/feedBackControllers.mjs";
const router = express.Router();
router.get("/", getFeedBack);
router.post("/", sendFeedBack);
router.delete("/", deleteFeedbacks);
export default router;
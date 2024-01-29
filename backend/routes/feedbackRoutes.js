import express from "express";
import { sendFeedBack, getFeedBack } from "../controllers/feedBackControllers.mjs";
const router = express.Router();
router.route("/").post(sendFeedBack).get(getFeedBack);
export default router;
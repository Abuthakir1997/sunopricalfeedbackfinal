import express from "express"
import mongoose from 'mongoose';
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import cors from 'cors';
import path from "path";
import { fileURLToPath } from 'url';
import feedbackRoutes from "../backend/routes/feedbackRoutes.js";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import connectDB from "./config/db.mjs";
const app = express();
connectDB();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
if (process.env.NODE_ENV === "production") {
    //set static folder
    app.use(express.static(path.join(__dirname, "../frontend/build")));
    // any route that is not api will be redirected ti index.html
    app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html")))
}
else {
    app.get("/", (req, res) => {
        res.send("Api is running...");
    })
}
app.use("/api/feedback", feedbackRoutes);
app.listen(PORT, console.log(`server is running on port ${PORT}`));
import express from "express"
import mongoose from 'mongoose';
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import cors from 'cors';
import path from "path";
import { fileURLToPath } from 'url';
import feedbackRoutes from "../backend/routes/feedbackRoutes.js";
dotenv.config();
import connectDB from "./config/db.mjs";
const app = express();
connectDB();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());

app.use("/api/feedback", feedbackRoutes);
const __dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
        res.send('API is running....')
    })
}

app.listen(PORT, console.log(`server is running on port ${PORT}`));
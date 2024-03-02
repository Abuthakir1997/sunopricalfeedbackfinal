import Feedback from "../models/feedback.model.mjs";
const MAX_RETRIES = 3;
let retries = 0;
const getFeedBackResponse = async (req, res) => {
    try {
        if (req.method === "GET") {
            return await getFeedBack(req, res);
        }
        else {
            return await sendFeedBack(req, res);
        }
    }
    catch (error) {
        console.log("error in getFeedBackResponse", error);
    }
}

const sendFeedBack = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: "Bad Request: Request body is missing." });
        }

        const newFeedBack = new Feedback(req.body);
        await newFeedBack.save();
        res.status(201).json({ message: "FeedBack Saved successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getFeedBack = async (req, res) => {
    try {
        const feedback = await Feedback.find().select('message').limit(100).sort({ createdAt: -1 });
        res.status(200).json(feedback);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export { sendFeedBack, getFeedBack, getFeedBackResponse };


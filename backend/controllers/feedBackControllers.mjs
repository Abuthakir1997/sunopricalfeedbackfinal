import Feedback from "../models/feedback.model.mjs";

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
        const newFeedBack = new Feedback(req.body);
        await newFeedBack.save();
        res.status(201).json({ message: "FeedBack Saved successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getFeedBack = async (req, res) => {
    try {
        const feedback = await Feedback.find();
        res.status(200).json(feedback);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export { sendFeedBack, getFeedBack, getFeedBackResponse };


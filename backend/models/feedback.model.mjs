import mongoose from "mongoose";

const feedBackSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    createdAt: { type: Date, default: Date.now, index: true },
});

const Feedback = mongoose.model("FeedBack", feedBackSchema);


export default Feedback;
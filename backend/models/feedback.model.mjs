import mongoose from "mongoose";
const countryCode = +91;
const feedBackSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    phoneNumber: { type: String, default: countryCode },
    rating: Number,
    createdAt: { type: Date, default: Date.now, index: true },
});

const Feedback = mongoose.model("FeedBack", feedBackSchema);


export default Feedback;
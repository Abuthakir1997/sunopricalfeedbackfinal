import mongoose from "mongoose";

const feedBackSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const Feedback = mongoose.model("FeedBack", feedBackSchema);


export default Feedback;
import React, { useCallback, useMemo, useState } from 'react';
import "./feed-back-form.scss";
import axios from "axios";
import MessageModal from '../message-modal/message-modal';
const FeedBackForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [message, setMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const handleChange = useCallback((event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value })
    }, [formData]);

    const checkDataValid = useCallback((formData) => {
        let isValid = false;
        let emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        if (formData.name !== "") {
            isValid = true
        }
        if (formData.email !== "") {
            if (emailPattern.test(formData.email)) {
                isValid = true;
            }
            else {
                isValid = false;
                return;
            }
        }
        if (formData.message !== "") {
            isValid = true;
        }
        return isValid;
    }, [formData]);

    const handleSubmit = async () => {
        try {
            if (!checkDataValid(formData)) {
                setMessage("Please provide valid value");
                setShowModal(true);
                return;
            }
            else {
                await axios.post('http://localhost:5000/api/feedback', formData);
                setFormData({ name: "", email: "", message: "" });
                setMessage("Feedback submitted successfully thank you!");
                setShowModal(true);
            }

        }
        catch (error) {
            console.log('Error submitting feedback:', error);
            alert('An error occurred while submitting feedback.');
        }
    }

    const handleGetFeedback = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/feedback");
            console.log("response", response);
        }
        catch (error) {
            console.log('Error getting feedback:', error);
        }
    }

    const canSubmit = useMemo(() => {
        if (formData.name !== "" && formData.email !== "" && formData.message !== "") return true;
        return false;
    }, [formData])

    return (
        <>
            <div className='input-wrapper'>
                <div className='thank-you-text'>Thank you for visiting</div>
                <div className='header'>
                    Please provide your feedback
                </div>
                <div className='name-input'>
                    <label htmlFor='name'>Name:</label>
                    <input required placeholder='Please type your name' name="name" type='text' value={formData.name} onChange={handleChange}>
                    </input>
                </div>
                <div className='email-input'>
                    <label htmlFor='email'>Email:</label>
                    <input required placeholder='Please type your email' name="email" type='email' value={formData.email} onChange={handleChange}>
                    </input>
                </div>
                <div className='text-area-input'>
                    <label htmlFor='message'>Message:</label>
                    <textarea placeholder='Please type your feedback' name="message" type='text' value={formData.message} onChange={handleChange}>
                    </textarea>
                </div>
            </div>

            <button className={`submit-btn ${!canSubmit ? "disable" : ""}`} onClick={() => handleSubmit()}>Submit</button>
            {showModal && <MessageModal message={message} showModal={showModal} setShowModal={setShowModal} />}
            {/* <button onClick={() => handleGetFeedback()}>Get feedbacks</button> */}
        </>
    )
}

export default FeedBackForm;
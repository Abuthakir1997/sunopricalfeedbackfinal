import React, { useCallback, useEffect, useMemo, useState } from 'react';
import "./feed-back-form.scss";
import axios from "axios";
import MessageModal from '../message-modal/message-modal';
import TripleTapComponent from '../triple-tap-component/triple-tap.component';
import Rating from '../rating/rating-component';
import { checkIfEmailIsValid } from '../../utils/validation.utils';
const FeedBackForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
        phoneNumber: "",
        rating: 0
    });
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const handleChange = useCallback((event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value, rating: rating })
    }, [formData]);

    const handleChangePhoneNumber = useCallback((event) => {
        const inputPhoneNumber = event.target.value.replace(/\D/g, '');
        const trimmedPhoneNumber = inputPhoneNumber.slice(0, 10); // Limit to 10 digits
        setFormData({ ...formData, phoneNumber: trimmedPhoneNumber });
    }, [formData]);


    const checkDataValid = useCallback((formData) => {
        let isValid = false;
        if (!checkIfEmailIsValid(formData.email)) {
            isValid = false;
            setMessage("Please provide a valid email");
            return;
        }
        if (formData.phoneNumber !== "") {
            isValid = true
        }
        else {
            isValid = false;
            setMessage("Please provide a phone number");
            return;
        }
        return isValid;
    }, [formData]);

    const isDevelopment = process.env.NODE_ENV === "development";
    const apiEndPointUrl = `${process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://sunopticalfeedback.onrender.com"}`
    const handleSubmit = async () => {
        try {
            if (!checkDataValid(formData)) {
                setShowModal(true);
                return;
            }
            else {
                await axios.post(`${apiEndPointUrl}/api/feedback`, formData);
                setFormData({ name: "", email: "", message: "", phoneNumber: "", rating: 0 });
                setMessage("Feedback submitted successfully thank you!");
                setShowModal(true);
                setRating(0);
            }

        }
        catch (error) {
            console.log('Error submitting feedback:', error);
            alert('An error occurred while submitting feedback.');
        }
    }

    const handleRating = useCallback((value) => {
        setRating(value);
        setFormData(prevFormData => ({
            ...prevFormData,
            rating: value
        }));
    }, []);

    const handleDeleteFeedbacks = async () => {
        try {
            const response = await axios.delete(`${apiEndPointUrl}/api/feedback`);
        }
        catch (error) {
            console.log("Error in deleteFeedbacks", error);
        }
    }

    const canSubmit = useMemo(() => {
        if (formData.name !== "" && (formData.email || formData.phoneNumber) !== "" && formData.message !== "") return true;
        return false;
    }, [formData])


    return (
        <>
            <TripleTapComponent />
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
                <div className='phone-number-input'>
                    <label htmlFor='phoneNumber'>Phone: <span className='required-field'>*</span></label>
                    <input required placeholder='Please type your phone number' name="phoneNumber" type='text' value={formData.phoneNumber} onChange={handleChangePhoneNumber} maxLength={10} />
                </div>
                <div className='rating-input'>
                    <h3 className='rating-header-text'>Please Provide Your Rating</h3>
                    <Rating initialValue={rating} onChange={handleRating}></Rating>
                </div>
                <div className='text-area-input'>
                    <label htmlFor='message'>Message:</label>
                    <textarea placeholder='Please type your feedback' name="message" type='text' value={formData.message} onChange={handleChange}>
                    </textarea>
                </div>
            </div>

            <button className={`submit-btn ${!canSubmit ? "disable" : ""}`} onClick={() => handleSubmit()}>Submit</button>
            {showModal && <MessageModal message={message} showModal={showModal} setShowModal={setShowModal} />}
            {isDevelopment && <button className='delete-btn' onClick={({ }) => handleDeleteFeedbacks()}>Delete</button>}
        </>
    )
}

export default FeedBackForm;
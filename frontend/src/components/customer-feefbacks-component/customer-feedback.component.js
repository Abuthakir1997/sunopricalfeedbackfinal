import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./customer-feedback.component.styles.scss";
import { checkIfHasValid } from '../../utils/validation.utils';
const CustomerFeedbacks = () => {
    const [feedBacks, setFeedBacks] = useState([]);
    let navigate = useNavigate();
    const handleGetFeedback = async () => {
        try {
            const response = await axios.get(`${process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://sunopticalfeedback.onrender.com"}/api/feedback`);
            setFeedBacks([...response.data]);

        }
        catch (error) {
            console.log('Error getting feedback:', error);
        }
    }

    const feedBacksElement = useMemo(() => {
        if (!feedBacks.length) return null;
        return feedBacks.map((feedBack, index) => {
            const { name, message, email } = feedBack;
            return (
                <>
                    {checkIfHasValid(message) &&
                        <div className='customer-feedbacks-container-contents-content' key={index}>
                            <div className='customer-feedbacks-container-contents-content-name'>
                                {name}
                            </div>
                            {checkIfHasValid(email) && <div className='customer-feedbacks-container-contents-content-email'>
                                {email}
                            </div>}
                            <div className='customer-feedbacks-container-contents-content-message'>
                                {message}
                            </div>
                        </div>
                    }
                </>

            )
        })



    }, [feedBacks]);

    const handleClose = () => {
        navigate("/");
    }

    useEffect(() => {
        handleGetFeedback();
    }, []);

    return (
        <>
            <div className='customer-feedbacks-container'>
                <div className='close' onClick={() => handleClose()}>X</div>
                <div className='customer-feedbacks-container-header'>
                    FeedBacks
                </div>
                <div className='customer-feedbacks-container-contents'>
                    {feedBacksElement}
                </div>
            </div>
        </>
    )
}

export default CustomerFeedbacks;
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./customer-feedback.component.styles.scss";
import { checkIfHasValid } from '../../utils/validation.utils';
import { apiEndPointUrl } from '../../utils/common.utils';
import Loader from '../../shared-components/loader-component';
const CustomerFeedbacks = () => {
    const [showLoader, setShowLoader] = useState(false);
    const [feedBacks, setFeedBacks] = useState([]);
    let navigate = useNavigate();
    const handleGetFeedback = async () => {
        try {
            setShowLoader(true);
            const response = await axios.get(`${apiEndPointUrl}/api/feedback`);
            setShowLoader(false);
            console.log("response", response);
            setFeedBacks([...response.data]);

        }
        catch (error) {
            console.log('Error getting feedback:', error);
        }
    }
    const feedBacksElement = useMemo(() => {
        if (!feedBacks.length) return <div className='no-data-message'>No Datas Available</div>;
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


    return (
        <>
            <Loader showLoader={showLoader}></Loader>
            <div className='customer-feedbacks-container'>
                <div className='close' onClick={() => handleClose()}>X</div>
                <div className='customer-feedbacks-container-header'>
                    FeedBacks
                </div>
                <div className='customer-feedbacks-container-contents'>
                    {!feedBacks.length ? <button className='get-feedbacks-btn' onClick={() => handleGetFeedback()}>Get FeedBacks</button> : null}
                    {feedBacksElement}
                </div>
            </div>
        </>
    )
}

export default CustomerFeedbacks;
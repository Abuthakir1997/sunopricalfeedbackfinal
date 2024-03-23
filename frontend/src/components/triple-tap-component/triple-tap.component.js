import React, { useState, useEffect } from 'react';
import "./triple-tap.component.styles.scss";
import { useNavigate } from 'react-router-dom';

const TripleTapComponent = () => {
    const [tapCount, setTapCount] = useState(0);
    let navigate = useNavigate();
    useEffect(() => {
        const handleTap = () => {
            // Increase tap count on each tap
            setTapCount((prevCount) => prevCount + 1);

            // Reset tap count after a certain delay
            setTimeout(() => {
                setTapCount(0);
            }, 300); // You can adjust the delay as needed
        };

        if (tapCount === 3) {
            navigate('/customerFeedbacks');
            setTapCount(0);
        }

        // Attach touch start event listener to the document
        document.addEventListener('click', handleTap);

        // Clean up the event listener
        return () => {
            document.removeEventListener('click', handleTap);
        };
    }, [tapCount]);


    return (
        <div className='triple-tap'>
        </div>
    );
};

export default TripleTapComponent;

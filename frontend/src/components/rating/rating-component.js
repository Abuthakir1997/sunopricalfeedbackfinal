import React, { useState } from 'react'
import "./rating-component-styles.scss";
const Rating = ({ initialValue, onChange }) => {
    const [rating, setRating] = useState(initialValue);

    const handleRatingChange = (value) => {
        setRating(value);
        onChange(value);
    };

    return (
        <div className='rating'>
            {[1, 2, 3, 4, 5].map((value) => (
                <span
                    key={value}
                    style={{ cursor: 'pointer', color: value <= rating ? 'gold' : 'gray' }}
                    onClick={() => handleRatingChange(value)}
                >
                    &#9733;
                </span>
            ))}
        </div>
    );
};

export default Rating;
import React, { useEffect, useMemo, useState } from 'react'
import "./rating-component-styles.scss";
const Rating = (props) => {
    const { initialValue, onChange } = props;
    const [rating, setRating] = useState(initialValue);
    const handleRatingChange = (value) => {
        setRating(value);
        onChange(value);
    };

    const ratingStars = useMemo(() => {
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
        )
    }, [rating, handleRatingChange, initialValue]);

    useEffect(() => {
        // Update the rating state when the initialValue prop changes
        setRating(initialValue);
    }, [initialValue]);

    return (
        <>
            {ratingStars}
        </>

    );
};

export default Rating;
import React from 'react';
import "./loader-component.scss";

const Loader = (props) => {
    const { showLoader = false } = props;
    return (
        showLoader ?
            <div className='spinner-wrapper'>
                <span class="loader"></span>
            </div>
            : null

    )
}

export default Loader
import React from 'react';
import "./message-modal.scss";

const MessageModal = (props) => {
    const { showModal, message, setShowModal } = props;
    return (

        <>
            <div className='overlay'>
                <div className='message-modal-wrapper'>
                    <div className='message-modal-inner'>
                        <div className='message'>
                            {message}
                        </div>
                        <button className='close-btn' onClick={() => setShowModal(false)}>Close</button>
                    </div>

                </div>
            </div>

        </>
    )
}

export default MessageModal;
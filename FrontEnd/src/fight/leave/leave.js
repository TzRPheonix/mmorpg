import './leave.css'; 
import React, { useState } from 'react';

function Leave({ onClose }) {
    const [showLeave, setShowLeave] = useState(true);

    const handleContinue = () => {
        setShowLeave(false);
        onClose();
    };

    const handleQuit = () => {
        localStorage.clear();
        window.location.href = "https://team2.bettercalldave.io/";
    };

    if (!showLeave) {
        return null;
    }

    return (
        <div className='leave'>
            <div className='leave-overlay'>
                <div className='leave-content'>
                    <span className='title'>Do you want to continue ? </span>

                    <div className='leave-btn'>
                        <button className='continue-btn' onClick={handleContinue}>Continue</button>
                        <button className='quit-btn' onClick={handleQuit}>Quitter</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Leave;

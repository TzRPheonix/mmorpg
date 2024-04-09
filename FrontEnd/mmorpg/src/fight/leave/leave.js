import './leave.css'; 
import React from 'react';

function Leave() {
    const [showFight, setShowFight] = useState(true);

    const handleContinue = () => {
        setShowFight(false);
      };

      const handleStop = () => {
        console.log('Stop');
      };

    return (
        <div className='leave'>
            <div className='leave-overlay'>
                <div className='leave-content'>
                    <span className='title'>Do you want to continue ? </span>

                    <div className='leave-btn'>
                        <button className='continue-btn'  onClick={handleContinue}>Continue</button>
                        <button className='stop-btn'  onClick={handleStop}>STOP</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Leave;

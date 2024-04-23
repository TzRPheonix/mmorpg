import React, { useEffect } from 'react';
import './damageDisplay.css';
const DamageDisplay = ({ damage, visible }) => {
    useEffect(() => {
      if (visible) {
        const displayElement = document.querySelector('.damage-display');
        displayElement.classList.add('damage-animation');
  
        setTimeout(() => {
          displayElement.classList.remove('damage-animation');
        }, 3000);
      }
    }, [visible]);
  
    return (
      <div className={`damage-display ${visible ? 'visible' : ''}`}>
        {damage}
      </div>
    );
  };
  

export default DamageDisplay;

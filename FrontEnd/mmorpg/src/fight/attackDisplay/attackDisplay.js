import React, { useEffect, useState } from 'react';
import './attackDisplay.css';

const AttackDisplay = ({ damage, visible, onAnimationEnd }) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      setTimeout(() => {
        setShouldRender(false);
        onAnimationEnd();
      }, 2000 );
    }
  }, [visible, onAnimationEnd]);

  return shouldRender ? (
    <div className={`attack-display ${visible ? 'attack-animation' : ''}`}>
      {damage}
    </div>
  ) : null;
};

export default AttackDisplay;

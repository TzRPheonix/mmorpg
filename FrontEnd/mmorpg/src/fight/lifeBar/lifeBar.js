import React from 'react';
import './lifeBar.css'; 

function LifeBar({ health }) {
  let barColor;
  if (health >= 80) {
    barColor = 'green';
  } else if (health >= 50) {
    barColor = 'yellow';
  } else if (health >= 20) {
    barColor = 'orange';
  } else {
    barColor = 'red';
  }

  const barStyle = {
    width: `${health}%`,
    backgroundColor: barColor
  };

  return (
    <div className='lifeBar'>
      <div className='healthBar' style={barStyle}></div>
    </div>
  );
}

export default LifeBar;

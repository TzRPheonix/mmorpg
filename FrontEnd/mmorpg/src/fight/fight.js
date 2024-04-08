import './fight.css'; 
import React, { useState } from 'react';
import LifeBar from './lifeBar/lifeBar';
function Fight() {
    const playerName = localStorage.getItem('username');
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await loadUserInfo();
            setUserData(data);
        };

        fetchData();
    }, []);

    const handleAttack = () => {
        console.log('Attack !');
      };
  return (
    <div className="fight">
        <div className='HeaderFight'>
            <button style={{visibility:'hidden'}}>Leave </button>
            <div className='title-container'>
                <span className='title' style={{color:"#9B1D20"}}>Level 18</span>
            </div>
            <button className='leaveFight'>Leave </button>
        </div>
        <div className='containerFight'>
            <div className='fightZone'>
                <div className='playerZone'>
                    <span>playerName</span>
                    <div className='lifeBar'>
                    <LifeBar health={75} />
                    </div>
                    <span style={{color:'#F4B860'}}>PV : 100</span>
                    <br></br>
                    <span style={{color:'#F4B860'}}>Damage : 2</span>
                </div>
                <div className='monsterZone'>
                    <span >monsterName</span>
                    <div className='lifeBar'>
                    <LifeBar health={100} />
                    </div>
                    <span style={{color:'#F4B860'}}>PV : 150</span>
                    <br></br>
                    <span style={{color:'#F4B860'}}>Damage : 1</span>
                </div>
            </div>
            <div className='attack'>
                <button className='btnAttack' onClick={handleAttack}>Attack</button>
            </div>
        </div>
    </div>
  );
}

export default Fight;

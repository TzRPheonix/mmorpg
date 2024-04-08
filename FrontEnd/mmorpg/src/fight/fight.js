import './fight.css'; 
import React, { useState, useEffect } from 'react';


async function loadUserInfo() {
    try {
        const username = localStorage.getItem('username');
        console.log(username);
        const response = await fetch(`http://localhost:3000/api/getUser/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

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

    return (
        <div className="fight">
                <div className='HeaderFight'>
                        <button style={{display:'none'}}>Leave </button>
                        <div className='title-container'>
                                <span className='title' style={{color:"#9B1D20"}}>Level 18</span>
                        </div>
                        <button className='leaveFight'>Leave </button>
                </div>
                <div className='fightZone'>
                        <div className='playerZone'>
                                <span className='playerName'>{playerName}</span>
                        </div>
                        <div className='monsterZone'>
                                <span className='monsterName'>Nom du Monstre</span>
                        </div>
                </div>
        </div>
    );
}

export default Fight;

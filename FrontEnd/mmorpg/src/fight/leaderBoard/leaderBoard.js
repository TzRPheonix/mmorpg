import './leaderBoard.css'; 
import React, { useState, useEffect } from 'react';

async function loadLeaderBoard() {
    try {
        const username = localStorage.getItem('username');
        console.log(username);
        const response = await fetch(`http://localhost:3000/api/leaderboard`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}


function LeaderBoard() {
    const username = localStorage.getItem('username');
    const [leaderboardData, setLeaderboardData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await loadLeaderBoard();
            console.log(data)
            setLeaderboardData(data);
        };

        fetchData();
    }, []);

  return (
    <div className='leaderBoard'>
        <div className='leaderBoard-overlay'>
            <div className='leaderBoard-content'>
                <span className='leaderBoard-title'>LeaderBoard </span>
                <div className='leaderBoard-container'>
                    {leaderboardData.map(user => (
                        <div key={user.id} className='user'>
                            <span className='username'>{user.username}</span>
                            <span className='killcount'>{user.killCount}</span>
                            <span className='deathCount'>{user.deathCount}</span>
                            <span className='level'>{user.starterLVL}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
}

export default LeaderBoard;

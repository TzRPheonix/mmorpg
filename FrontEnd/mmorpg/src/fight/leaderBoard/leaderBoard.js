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
    const [showLeaderBoard, setShowLeaderBoard] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await loadLeaderBoard();
            console.log(data)
            setLeaderboardData(data);
        };

        fetchData();
    }, []);

    const handleClose = () => {
        setShowLeaderBoard(false);
    };

    if (!showLeaderBoard) {
        return null;
    }

  return (
    <div className='leaderBoard'>
        <div className='leaderBoard-overlay'>
            <div className='leaderBoard-content'>
                <span className='leaderBoard-title'>LeaderBoard </span>
                <button onClick={handleClose}>Fermer</button>
                <div className='leaderBoard-container'>
                        <table className='leaderBoard-table'>
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Kill Count</th>
                                    <th>Death Count</th>
                                    <th>Level</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaderboardData.map(user => (
                                    <tr key={user.id} className={user.username === username ? 'bold-row' : ''}>
                                        <td>{user.username}</td>
                                        <td>{user.killCount}</td>
                                        <td>{user.deathCount}</td>
                                        <td>{user.starterLVL}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
            </div>
        </div>
    </div>
  );
}

export default LeaderBoard;

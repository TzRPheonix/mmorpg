import './leaderBoard.css'; 
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';


async function loadLeaderBoard() {
    try {
        const response = await fetch(`https://team2-ws.bettercalldave.io/api/leaderboard`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log("Leaderboard data:", data);
        return data;
    } catch (error) {
        console.error(error);
    }
}

function LeaderBoard({ onClose }) {
    const username = localStorage.getItem('username');
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [showFight, setShowFight] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await loadLeaderBoard();
            console.log(data)
            setLeaderboardData(data);
        };

        fetchData();
    }, []);

    const handleClose = () => {
        setShowFight(false);
        onClose();
    };

    if (!showFight) {
        return null;
    }

return (
    <div className='leaderBoard'>
            <div className='leaderBoard-overlay'>
                    <div className='leaderBoard-content'>
                            <div style={{display:'flex'}}>
                                    <button style={{display:'none',float:'left'}}>Fermer</button>
                                    <span className='leaderBoard-title'>LeaderBoard </span>
                                    <button style={{float:'right'}} onClick={handleClose}><X color="red" size={48} /></button>
                            </div>
                            
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
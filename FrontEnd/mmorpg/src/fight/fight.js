import './fight.css'; 
import React, { useState, useEffect } from 'react';
import LifeBar from './lifeBar/lifeBar';
import './fight.css'; 
import leaveImage from '../img/settings.png';
import leaderBoardImage from '../img/leaderboard.png'
import LeaderBoard from './leaderBoard/leaderBoard';
import Leave from './leave/leave';
import logoTygraxe from "../photoStarter/Tygraxe.png";
import logoVolpeur from "../photoStarter/Volpeur.png";
import logoAzerty from "../photoStarter/Azerty.png";
import logoValstrax from "../photoStarter/Valstrax.png";
import logoMonokuma from "../photoStarter/Monokuma.png";
import logoFatalix from "../photoStarter/Fatalix.png";

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
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function getRandomMonster() {
    try {
        const username = localStorage.getItem('username');
        console.log(username);
        const response = await fetch(`http://localhost:3000/api/getRandomMonster/${username}`, {
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


async function handleEndCombat(starterPV, monsterPV) {
    const username = localStorage.getItem('username');

    try {
        const response = await fetch('http://localhost:3000/api/EndCombat', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ starterPV, monsterPV, username })
        });

        const data = await response.json();
        console.log(data.message);
        window.location.href = 'http://localhost:3001/Fight';
    } catch (error) {
        console.error(error);
    }
}

function Fight() {
    const username = localStorage.getItem('username');
    const [StarterLVL, setStarterLVL] = useState(null);
    const [StarterPV, setStarterPV] = useState(null);
    const [StarterMAXPV, setStarterMAXPV] = useState(null);
    const [StarterDMG, setStarterDMG] = useState(null);
    const [monsterName, setMonsterName] = useState(null);
    const [monsterPV, setMonsterPV] = useState(null);
    const [monsterMAXPV, setMonsterMAXPV] = useState(null);
    const [monsterDMG, setMonsterDMG] = useState(null);
    const [nbPotion, setNbPotion] = useState(null);
    const [message, setMessage] = useState(null);
    const [starterName, setStarterName] = useState(null)

    const [showLeaderBoard, setShowLeaderBoard] = useState(false);
    const [showLeave, setShowLeave] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            const data = await loadUserInfo();
            setStarterLVL(data.starterLVL);
            setStarterPV(data.starterPV);
            setStarterMAXPV(data.starterMAXPV);
            setStarterDMG(data.starterDMG);
            setStarterName(data.starterName);
            setNbPotion(data.healthPotionCount);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getRandomMonster();
            console.log(data)
            setMonsterName(data.monstername);
            setMonsterPV(data.monsterPV);
            setMonsterMAXPV(data.monsterPV);
            setMonsterDMG(data.monsterDMG);
        };

        fetchData();
    }, []);

    const handleAttack = () => {
        const newMonsterPV = monsterPV - StarterDMG;
        if (newMonsterPV < 0) {
            setMonsterPV(0);
        } else {
            setMonsterPV(newMonsterPV);
        }
        if (newMonsterPV <= 0 || StarterPV <= 0) {
            handleEndCombat(StarterPV, newMonsterPV);
        }
    };

    const handlePotion = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/useHealthPotion', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, StarterPV })
            });
            const data = await response.json();
                if (StarterPV !== data.newPV) {
                setNbPotion(nbPotion - 1);
                setStarterPV(data.newPV);
            }
            setMessage(data.message);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleDamage(StarterPV,monsterDMG);
        }, 5000);

        return () => clearInterval(interval);   
    }, [StarterPV, monsterDMG]);

    const handleDamage = (StarterPV,monsterDMG) => {
        const newPlayerPV = StarterPV - monsterDMG;
        if (newPlayerPV < 0) {
            setStarterPV(0);
        } else {
            setStarterPV(newPlayerPV);
        }
        if (monsterPV <= 0 || StarterPV <= 0) {
            handleEndCombat(StarterPV, monsterPV);
        }
    };

    const handleClickLeaderBoard = () => {
        setShowLeaderBoard(true);
    };

    const handleClickLeave = () => {
        setShowLeave(true);
    };

    const logosMap = {
        'Tygraxe': logoTygraxe,
        'Volpeur': logoVolpeur,
        'Azerty': logoAzerty,
        'Valstrax': logoValstrax,
        'Monokuma': logoMonokuma,
        'Fatalix': logoFatalix
    };

  return (
    <div className="fight">
        <div className='HeaderFight'>
            <button className='leaveFight' onClick={handleClickLeaderBoard}><img src={leaderBoardImage} alt='LeaderBoard' /> </button>
            <div className='title-container'>
                <span className='title' style={{color:"#9B1D20"}}>{StarterLVL}</span>
            </div>
            <button className='leaveFight' onClick={handleClickLeave}><img src={leaveImage} alt='Leave' /></button>
        </div>
        <div className='containerFight'>
            <div className='fightZone'>
                <div className='playerZone'>
                    <span style={{color:'#FFFFFF'}}>  {username} avec {starterName}</span>
                    <div className='lifeBar'>
                    <LifeBar health={Math.floor((StarterPV / StarterMAXPV) * 100)} />
                    </div>
                    <span style={{color:'#F4B860'}}>PV : {StarterPV}/{StarterMAXPV}</span>
                    <br></br>
                    <span style={{color:'#F4B860'}}>Damage : {StarterDMG}</span>
                    <div className='potionZone'>
                        <button className='potionButton' onClick={handlePotion}>Potion : {nbPotion}</button>
                    </div>
                    {starterName && <span><img src={logosMap[starterName]} alt={starterName} /></span>}
                </div>
                <div className='monsterZone'>
                    <span style={{color:'#FFFFFF'}}>{monsterName}</span>
                    <div className='lifeBar'>
                    <LifeBar health={Math.floor((monsterPV / monsterMAXPV) * 100)} />
                    </div>
                    <span style={{color:'#F4B860'}}>PV : {monsterPV}/{monsterMAXPV}</span>
                    <br></br>
                    <span style={{color:'#F4B860'}}>Damage : {monsterDMG}</span>
                </div>
            </div>
            <div className='attack'>
                <button className='btnAttack' onClick={handleAttack}>Attack</button>
            </div>
            {message && (
                <div className="messageBox">
                    {message}
                </div>
            )}
        </div>
        {showLeaderBoard && <LeaderBoard />}
        {showLeave && <Leave />}

    </div>
  );
}

export default Fight;

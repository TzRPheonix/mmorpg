import './fight.css'; 

function Fight() {

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
                <span className='playerName'>Nom du Joueur</span>
            </div>
            <div className='monsterZone'>
                <span className='monsterName'>Nom du Monstre</span>
            </div>
        </div>
    </div>
  );
}

export default Fight;

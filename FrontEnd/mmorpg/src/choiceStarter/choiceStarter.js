import './choiceStarter.css'; 

function handleChoiceStarter(starterName, starterPV, starterDMG) {
    const username = localStorage.getItem('username');
    fetch('http://localhost:3000/api/addStarterToUser', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            starterName,
            starterPV,
            starterDMG,
            username: username
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        alert(data.message);
        console.log(data)

        window.location.href = 'http://localhost:3001/fight';
    })
    .catch(error => {
        console.error(error); 
    });
}

function ChoiceStarter() {

return (
    <div className="ChoiceStarter">
        <div className='HeaderChoiceStarter'>
            <span className='title' style={{color:"#9B1D20"}}>Select your starter</span>
        </div>
        <div className='Choice'>
            <div className="grid-container">
                    <div className="grid-item">
                            <div className="square">
                                    <span>Name : Tygraxe</span>
                                    <span>PV : 50</span>
                                    <span>Damage: 10</span>

                            </div>
                            <button className="select-button" onClick={() => handleChoiceStarter("Tygraxe", 50, 10)}>Select</button>
                    </div>
                    <div className="grid-item">
                            <div className="square">                    
                                    <span>Name : Volpeur</span>
                                    <span>PV : 100</span>
                                    <span>Damage: 2</span>
                            </div>
                            <button className="select-button" onClick={() => handleChoiceStarter("Volpeur", 100, 2)}>Select</button>
                    </div>
                    <div className="grid-item">
                            <div className="square">
                                    <span>Name : Azerty</span>
                                    <span>PV : 80</span>
                                    <span>Damage: 5</span>
                            </div>
                            <button className="select-button" onClick={() => handleChoiceStarter("Azerty", 80, 5)}>Select</button>
                    </div>
                    <div className="grid-item">
                            <div className="square">
                                    <span>Name : Tygraxe</span>
                                    <span>PV : 50</span>
                                    <span>Damage: 10</span>

                            </div>
                            <button className="select-button" onClick={() => handleChoiceStarter("Tygraxe", 50, 10)}>Select</button>
                    </div>
                    <div className="grid-item">
                            <div className="square">                    
                                    <span>Name : Volpeur</span>
                                    <span>PV : 100</span>
                                    <span>Damage: 2</span>

                            </div>
                            <button className="select-button" onClick={() => handleChoiceStarter("Volpeur", 100, 2)}>Select</button>
                    </div>
                    <div className="grid-item">
                            <div className="square">
                                    <span>Name : Azerty</span>
                                    <span>PV : 80</span>
                                    <span>Damage: 5</span>
                            </div>
                            <button className="select-button" onClick={() => handleChoiceStarter("Azerty", 80, 5)}>Select</button>
                    </div>
            </div>
        </div>
    </div>
);
}

export default ChoiceStarter;

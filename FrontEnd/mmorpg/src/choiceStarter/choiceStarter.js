import './choiceStarter.css'; 
import logoTygraxe from "../photoStarter/Tygraxe.png";
import logoVolpeur from "../photoStarter/Volpeur.png";
import logoAzerty from "../photoStarter/Azerty.png";
import logoValstrax from "../photoStarter/Valstrax.png";
import logoMonokuma from "../photoStarter/Monokuma.png";
import logoFatalix from "../photoStarter/Fatalix.png";

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
            <span className='titleChoiceStarter' style={{color:"#9B1D20"}}>Select your starter</span>
        </div>
        <div className='Choice'>
            <div className="grid-container">
                    <div className="grid-item">
                        <div className="square">
                                <span>Name : Tygraxe</span>
                                <span>PV : 150</span>
                                <span>Damage: 5</span>
                                <span><img src={logoTygraxe} alt="Tygraxe" /></span>
                        </div>
                        <button className="select-button" onClick={() => handleChoiceStarter("Tygraxe", 150, 5)}>Select</button>
                    </div>
                    <div className="grid-item">
                        <div className="square">                    
                                <span>Name : Volpeur</span>
                                <span>PV : 100</span>
                                <span>Damage: 10</span>
                                <span><img src={logoVolpeur} alt="Volpeur" /></span>
                        </div>
                        <button className="select-button" onClick={() => handleChoiceStarter("Volpeur", 100, 10)}>Select</button>
                    </div>
                    <div className="grid-item"> 
                        <div className="square">
                                <span>Name : Azerty</span>
                                <span>PV : 80</span>
                                <span>Damage: 20</span>
                                <span><img src={logoAzerty} alt="Azerty" /></span>
                        </div>
                        <button className="select-button" onClick={() => handleChoiceStarter("Azerty", 80, 20)}>Select</button>
                    </div>
                    <div className="grid-item">
                        <div className="square">
                                <span>Name : Valstrax</span>
                                <span>PV : 90</span>
                                <span>Damage: 15</span>
                                <span><img src={logoValstrax} alt="Valstrax" /></span>
                        </div>
                        <button className="select-button" onClick={() => handleChoiceStarter("Valstrax", 90, 15)}>Select</button>
                    </div>
                    <div className="grid-item">
                            <div className="square">                    
                                    <span>Name : Monokuma</span>
                                    <span>PV : 60</span>
                                    <span>Damage: 30</span>
                                    <span><img src={logoMonokuma} alt="Monokuma" /></span>
                            </div>
                            <button className="select-button" onClick={() => handleChoiceStarter("Monokuma", 60, 30)}>Select</button>
                    </div>
                    <div className="grid-item">
                        <div className="square">
                                <span>Name : Fatalix</span>
                                <span>PV : 170</span>
                                <span>Damage: 3</span>
                                <span><img src={logoFatalix} alt="Fatalix" /></span>
                        </div>
                        <button className="select-button" onClick={() => handleChoiceStarter("Fatalix", 170, 3)}>Select</button>
                    </div>
            </div>
        </div>
    </div>
);
}

export default ChoiceStarter;

import './choiceStarter.css'; 

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
                <button className="select-button">Select</button>
            </div>
            <div className="grid-item">
                <div className="square">                    
                    <span>Name : Volpeur</span>
                    <span>PV : 100</span>
                    <span>Damage: 2</span>
                </div>
                <button className="select-button">Select</button>
            </div>
            <div className="grid-item">
                <div className="square">
                    <span>Name : Azerty</span>
                    <span>PV : 80</span>
                    <span>Damage: 5</span>
                </div>
                <button className="select-button">Select</button>
            </div>
            <div className="grid-item">
                <div className="square">
                    <span>Name : Tygraxe</span>
                    <span>PV : 50</span>
                    <span>Damage: 10</span>

                </div>
                <button className="select-button">Select</button>
            </div>
            <div className="grid-item">
                <div className="square">                    
                    <span>Name : Volpeur</span>
                    <span>PV : 100</span>
                    <span>Damage: 2</span>

                </div>
                <button className="select-button">Select</button>
            </div>
            <div className="grid-item">
                <div className="square">
                    <span>Name : Azerty</span>
                    <span>PV : 80</span>
                    <span>Damage: 5</span>
                </div>
                <button className="select-button">Select</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ChoiceStarter;

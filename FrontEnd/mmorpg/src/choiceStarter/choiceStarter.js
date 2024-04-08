import './choiceStarter.css'; 

function ChoiceStarter() {

  return (
    <div className="ChoiceStarter">
      <div className='HeaderChoiceStarter'>
        <span>Select your starter</span>
      </div>
      <div className='Choice'>
        <div className="grid-container">
            <div className="grid-item">
                <div className="square">Texte 1</div>
                <button className="select-button">Sélectionner</button>
            </div>
            <div className="grid-item">
                <div className="square">Texte 2</div>
                <button className="select-button">Sélectionner</button>
            </div>
            <div className="grid-item">
                <div className="square">Texte 3</div>
                <button className="select-button">Sélectionner</button>
            </div>
            <div className="grid-item">
                <div className="square">Texte 4</div>
                <button className="select-button">Sélectionner</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ChoiceStarter;

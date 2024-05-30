import "./fight.css";
import React, { useState, useEffect } from "react";
import LifeBar from "./lifeBar/lifeBar";
import DamageDisplay from "./damageDisplay/damageDisplay";
import AttackDisplay from "./attackDisplay/attackDisplay";
import "./fight.css";
import leaveImage from "../img/settings.png";
import leaderBoardImage from "../img/leaderboard.png";
import LeaderBoard from "./leaderBoard/leaderBoard";
import Leave from "./leave/leave";
import logoTygraxe from "../photoStarter/Tygraxe.png";
import logoVolpeur from "../photoStarter/Volpeur.png";
import logoAzerty from "../photoStarter/Azerty.png";
import logoValstrax from "../photoStarter/Valstrax.png";
import logoMonokuma from "../photoStarter/Monokuma.png";
import logoFatalix from "../photoStarter/Fatalix.png";
import AquaTail from "../monsters/AquaTail.png";
import BoulderHide from "../monsters/BoulderHide.png";
import BrambleThorn from "../monsters/BrambleThorn.png";
import CinderSpike from "../monsters/CinderSpike.png";
import CrystalClaw from "../monsters/CrystalClaw.png";
import DawnFeather from "../monsters/DawnFeather.png";
import DuskClaw from "../monsters/DuskClaw.png";
import ElectroBuzz from "../monsters/ElectroBuzz.png";
import FlameTail from "../monsters/FlameTail.png";
import FrostBreath from "../monsters/FrostBreath.png";
import GaleBeak from "../monsters/GaleBeak.png";
import IronScale from "../monsters/IronScale.png";
import LunarFur from "../monsters/LunarFur.png";
import MistWalk from "../monsters/MistWalk.png";
import MysticWing from "../monsters/MysticWing.png";
import NebulaWisp from "../monsters/NebulaWisp.png";
import QuartzHorn from "../monsters/QuartzHorn.png";
import RazorFin from "../monsters/RazorFin.png";
import ShadeFlicker from "../monsters/ShadeFlicker.png";
import ShadowPelt from "../monsters/ShadowPelt.png";
import StormHorn from "../monsters/StormHorn.png";
import TerraRoot from "../monsters/TerraRoot.png";
import ThunderClap from "../monsters/ThunderClap.png";
import TidePulse from "../monsters/TidePulse.png";
import VenomFang from "../monsters/VenomFang.png";
import potion from "../img/potion.png";

async function loadUserInfo() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error('Token manquant.');
    }

    const response = await fetch(
      `http://team2-ws.bettercalldave.io/api/getUser/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
      }
    );

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des informations utilisateur.');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getRandomMonster() {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(
      `http://team2-ws.bettercalldave.io/api/getRandomMonster/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function handleEndCombat(starterPV, monsterPV, nbPotion) {
  const token = localStorage.getItem("token");

  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    await fetch("http://team2-ws.bettercalldave.io/api/EndCombat", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token  
      },
      body: JSON.stringify({ starterPV, monsterPV, nbPotion }),
    });
    window.location.href = "http://team2.bettercalldave.io/Fight";
  } catch (error) {
    console.error(error);
  }
}

function Fight() {
  const [username, setUsername] = useState(null);
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
  const [starterName, setStarterName] = useState(null);

  const [showLeaderBoard, setShowLeaderBoard] = useState(false);
  const [showLeave, setShowLeave] = useState(false);
  const [showDamageAnimation, setShowDamageAnimation] = useState(false);
  const [showAttackAnimation, setShowAttackAnimation] = useState(false);
  const [attackAnimations, setAttackAnimations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadUserInfo();
      setUsername(data.username)
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
      setMonsterName(data.monstername);
      setMonsterPV(data.monsterPV);
      setMonsterMAXPV(data.monsterPV);
      setMonsterDMG(data.monsterDMG);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleDamage(StarterPV, monsterDMG, monsterPV);
    }, 5000);

    return () => clearInterval(interval);
  }, [StarterPV, monsterDMG, monsterPV]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'f' || event.key === 'F') {
        console.log('Potion')
        handlePotion();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleAttack = () => {
    if (StarterPV > 0 && monsterPV > 0) {
      const newMonsterPV = monsterPV - StarterDMG;
      setAttackAnimations((prevAnimations) => [
        ...prevAnimations,
        <AttackDisplay
          damage={StarterDMG}
          visible={true}
          onAnimationEnd={() => {
            setAttackAnimations((prevAnimations) => prevAnimations.slice(1));
          }}
        />,
      ]);

      if (newMonsterPV < 0) {
        setMonsterPV(0);
      } else {
        setMonsterPV(newMonsterPV);
      }

      if (newMonsterPV <= 0 || StarterPV <= 0) {
        console.log("oui");
        const imgElement = document.querySelector(".imgMonster");
        imgElement.classList.add("monsterDeathAnimation");
        handleEndCombat(StarterPV, newMonsterPV, nbPotion);
      }

      console.log(monsterPV);
    } else {
      setAttackAnimations([]);
    }
  };

  const handleDamage = (StarterPV, monsterDMG, monsterPV) => {
    if (monsterPV > 0) {
      const newPlayerPV = StarterPV - monsterDMG;
      if (newPlayerPV < 0) {
        setStarterPV(0);
      } else {
        setStarterPV(newPlayerPV);
      }
      if (monsterPV <= 0 || newPlayerPV <= 0) {
        const imgElement = document.querySelector(".imgStarterFight");
        imgElement.classList.add("playerDeathAnimation");
        handleEndCombat(newPlayerPV, monsterPV, nbPotion);
      }

      const imgElement = document.querySelector(".imgMonster");
      imgElement.classList.add("moveAnimation");

      if (monsterDMG) {
        setShowDamageAnimation(true);
        setTimeout(() => {
          setShowDamageAnimation(false);
        }, 1000);
      }

      setTimeout(() => {
        imgElement.classList.remove("moveAnimation");
      }, 1000);
    }
  };


  const handlePotion = () => {
    console.log(StarterPV);
    if (StarterPV === 0) {
      setMessage("Vous êtes mort.");
      return 0;
    }
    if (nbPotion <= 0) {
      setMessage("Pas de potion de soin.");
      return 0;
    }
    if (StarterPV === StarterMAXPV) {
      setMessage("Déjà en pleine santé!");
      return 0;
    }
    setMessage("Soin de " + Math.round(Math.min(StarterPV + StarterMAXPV * 0.2, StarterMAXPV) - StarterPV));
    setNbPotion(nbPotion - 1);
    setStarterPV(Math.round(Math.min(StarterPV + StarterMAXPV * 0.2, StarterMAXPV)));
  };

  const handleCloseLeaderBoard = () => {
    setShowLeaderBoard(false);
  };

  const handleClickLeaderBoard = () => {
    setShowLeaderBoard(true);
  };

  const handleClickLeave = () => {
    setShowLeave(true);
  };

  const handleCloseLeave = () => {
    setShowLeave(false);
  };

  const logosMap = {
    Tygraxe: logoTygraxe,
    Volpeur: logoVolpeur,
    Azerty: logoAzerty,
    Valstrax: logoValstrax,
    Monokuma: logoMonokuma,
    Fatalix: logoFatalix,
  };

  const monsterLogosMap = {
    AquaTail: AquaTail,
    BoulderHide: BoulderHide,
    BrambleThorn: BrambleThorn,
    CinderSpike: CinderSpike,
    CrystalClaw: CrystalClaw,
    DawnFeather: DawnFeather,
    DuskClaw: DuskClaw,
    ElectroBuzz: ElectroBuzz,
    FlameTail: FlameTail,
    FrostBreath: FrostBreath,
    GaleBeak: GaleBeak,
    IronScale: IronScale,
    LunarFur: LunarFur,
    MistWalk: MistWalk,
    MysticWing: MysticWing,
    NebulaWisp: NebulaWisp,
    QuartzHorn: QuartzHorn,
    RazorFin: RazorFin,
    ShadeFlicker: ShadeFlicker,
    ShadowPelt: ShadowPelt,
    StormHorn: StormHorn,
    TerraRoot: TerraRoot,
    ThunderClap: ThunderClap,
    TidePulse: TidePulse,
    VenomFang: VenomFang,
  };

  return (
    <div className="fight">
      <div className="HeaderFight">
        <button className="leaveFight" onClick={handleClickLeaderBoard}>
          <img
            className="imgSetting"
            src={leaderBoardImage}
            alt="LeaderBoard"
          />{" "}
        </button>
        <div className="title-container">
          <span className="title" style={{ color: "#9B1D20" }}>
            {StarterLVL}
          </span>
        </div>
        <button className="leaveFight" onClick={handleClickLeave}>
          <img className="imgSetting" src={leaveImage} alt="Leave" />
        </button>
      </div>
      <div className="containerFight">
        <div className="fightZone">
          <div className="playerZone">
            <span style={{ color: "#FFFFFF" }}>
              {" "}
              {username} avec {starterName}
            </span>
            <div className="lifeBar">
              <LifeBar health={Math.floor((StarterPV / StarterMAXPV) * 100)} />
            </div>
            <span style={{ color: "#F4B860" }}>
              PV : {StarterPV}/{StarterMAXPV}
            </span>
            <br></br>
            <span style={{ color: "#F4B860" }}>Damage : {StarterDMG}</span>
            <br></br>
            <div className="potionContainer" onClick={handlePotion}>
              <img className="potionImage" src={potion} alt="Potion" />
              <span className="potionCount">{nbPotion}</span>
              </div>
            {starterName && (
              <span>
                <img
                  className="imgStarterFight"
                  src={logosMap[starterName]}
                  alt={starterName}
                />
              </span>
            )}
          </div>
          <div className="monsterZone">
            <span style={{ color: "#FFFFFF" }}>{monsterName}</span>
            <div className="lifeBar">
              <LifeBar health={Math.floor((monsterPV / monsterMAXPV) * 100)} />
            </div>
            <span style={{ color: "#F4B860" }}>
              PV : {monsterPV}/{monsterMAXPV}
            </span>
            <br></br>
            <span style={{ color: "#F4B860" }}>Damage : {monsterDMG}</span>
            <br></br>
            {monsterName && (
              <span>
                <img
                  className="imgMonster"
                  src={monsterLogosMap[monsterName]}
                  alt={monsterName}
                />
              </span>
            )}
            {showAttackAnimation && (
              <AttackDisplay damage={StarterDMG} visible={true} />
            )}
          </div>
          {showDamageAnimation && (
            <DamageDisplay damage={monsterDMG} visible={true} />
          )}
        </div>
        <div className="attack">
          <button className="btnAttack" onClick={handleAttack}>
            Attack
          </button>
        </div>
        {attackAnimations}
        {message && <div className="messageBox">{message}</div>}
      </div>
      {showLeaderBoard && <LeaderBoard onClose={handleCloseLeaderBoard} />}
      {showLeave && <Leave onClose={handleCloseLeave} />}
    </div>
  );
}

export default Fight;

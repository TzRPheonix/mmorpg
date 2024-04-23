import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './login/login.js';
import Register from './register/register.js';
import ChoiceStarter from './choiceStarter/choiceStarter.js'
import Fight from './fight/fight.js';
import Leave from './fight/leave/leave.js';
import LeaderBoard from './fight/leaderBoard/leaderBoard.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/choiceStarter" element={<ChoiceStarter />} />
        <Route path="/fight" element={<Fight />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/leaderBoard" element={<LeaderBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
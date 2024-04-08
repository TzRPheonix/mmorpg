import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './login/login.js';
import Register from './register/register.js';
import ChoiceStarter from './choiceStarter/choiceStarter.js'
import Fight from './fight/fight.js';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/choiceStarter" element={<ChoiceStarter />} />
        <Route path="/fight" element={<Fight />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />);
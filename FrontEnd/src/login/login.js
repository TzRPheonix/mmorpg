import React, { useState } from 'react';
import './login.css'; 
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  }

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://team2-ws.bettercalldave.io/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      console.log(data);
      if (data.token) {
        localStorage.setItem('token', data.token);  
        if (data.starterName === "None") {
          window.location.href = 'https://team2.bettercalldave.io/choiceStarter';
        }else{
          window.location.href = 'https://team2.bettercalldave.io/fight';
        }
      } else {
        alert('Utilisateur introuvable. Veuillez réessayer.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
      console.log(error);
    }
  }

  return (
    <div className="App">
      <div className="container">
        <div className="left-side"></div>
        <div className="right-side">
          <div style={{ height: '25%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <span className='titleLogin'>Login</span>
            <span className='subtitleLogin'>Not registered ? <Link to="/register">Sign up</Link></span>
          </div>
          <hr></hr>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <form onSubmit={handleSubmit} className='formLogin'>
              <div className='form-input'>
                <label className='labelForm'>Please enter your mail:</label>
                <br />
                <input
                  type="email"
                  value={email}
                  onChange={handleChangeEmail}
                  required
                  className='input'
                />
              </div>
              <div className='form-input'>
                <label className='labelForm'>Please enter your password:</label>
                <br />
                <input
                  type="password"
                  value={password}
                  onChange={handleChangePassword}
                  required
                  className='input'
                />
              </div>
              <button type="submit" className='btnForm'>Sign in</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

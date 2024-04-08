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
      const response = await fetch('http://localhost:3000/api/login', {
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
        localStorage.setItem('username', data.username);
        window.location.href = 'http://localhost:3001/choiceStarter';
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
            <h1>Titre Principal</h1>
            <h2>Sous-Titre</h2>
            <Link to="/register">Cliquez ici si vous n'êtes pas inscrit !</Link>
          </div>
          <hr></hr>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={handleChangeEmail}
                  required
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={handleChangePassword}
                  required
                />
              </div>
              <button type="submit" className=''>Sign in</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

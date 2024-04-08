import React, { useState } from 'react';
import './login.css'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  }

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form :', { email, password });
  }

  return (
    <div className="App">
      <div className="container">
        <div className="left-side"></div>
        <div className="right-side">
          <div style={{ height: '25%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h1>Titre Principal</h1>
            <h2>Sous-Titre</h2>
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

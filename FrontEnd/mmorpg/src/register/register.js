import './register.css';
import React, { useState } from 'react';

function Register() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
      }
    
      const handleChangeEmail = (event) => {
        setEmail(event.target.value);
      }
    
      const handleChangePassword = (event) => {
        setPassword(event.target.value);
      }
    
      const handleChangePasswordConfirm = (event) => {
        setPasswordConfirm(event.target.value);
      }
    
      const handleSubmit = (event) => {
        event.preventDefault();
        console.log('form :', { username, email, password, passwordConfirm });
      }

  return (
    <div className="App">
        <div className="container">
            <div className="left-side"></div>
            <div className="right-side">
                <div style={{ height: '25%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <h1>Titre Principal</h1>
                <h2 >Sous-Titre</h2>
            </div>
            <hr></hr>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input
                        type="text"
                        value={username}
                        onChange={handleChangeUsername}
                        required
                        />
                    </div>
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
                    <div>
                        <label>Confirm password:</label>
                        <input
                        type="password"
                        value={passwordConfirm}
                        onChange={handleChangePasswordConfirm}
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

export default Register;

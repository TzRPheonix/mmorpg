import './register.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Register() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const navigate = useNavigate(); 

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
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await fetch('http://team2-ws.bettercalldave.io/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password, passwordConfirm })
          });
          const data = await response.json();
          console.log(response.status)
          if (response.status === 400) {
            alert(data.message);
          } else {
            alert('Enregistrement réussi, redirection vers la connexion.');
            navigate('/');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }

  return (
    <div className="App">
        <div className="container">
            <div className="left-side"></div>
            <div className="right-side">
                <div style={{ height: '25%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <span className='titleRegister'>Create a new account</span>
                <span className='subtitleRegister'>Already registered ? <Link to="/">Sign in</Link></span>
            </div>
            <hr></hr>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <form onSubmit={handleSubmit} className='formRegister'>
                    <div className='form-input'>
                        <label className='labelForm'>Please enter your username:</label>
                        <br />
                        <input
                        type="text"
                        value={username}
                        onChange={handleChangeUsername}
                        required
                        className='input'
                        />
                    </div>
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
                    <div className='form-input'>
                        <label className='labelForm'>Please enter your Confirm password:</label>
                        <br />
                        <input
                        type="password"
                        value={passwordConfirm}
                        onChange={handleChangePasswordConfirm}
                        required
                        className='input'
                        />
                    </div>
                    <button type="submit" className='btnForm'>Sign up</button>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

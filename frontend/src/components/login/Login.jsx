import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import Popup from '../popup/Popup';

const Login = ({ switchToRegister, onClose, updateLoginState }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  function getFirstName(fullName) {
    const nameParts = fullName.split(' '); // Split the name by spaces
    return nameParts[0]; // Return the first part (first name)
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('https://backend-newton-capstone-eval.onrender.com/User/login', {
        email,
        password,
      });

      if (response.status == 200) {
        setPopupMessage('Login Successful!');
        setShowPopup(true);

        localStorage.setItem('token', response.data.token);
        const token = localStorage.getItem('token')
        
        if (token) {
          try {
            const response = await axios.get('https://backend-newton-capstone-eval.onrender.com/User/me', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const userName = getFirstName(response.data.user.name);
            updateLoginState(userName);
          } 
          catch (error) {
            console.error('Error fetching user info', error);
          }
        }

        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } 
    catch (error) {
      setPopupMessage('Invalid credentials, please try again!');
      setShowPopup(true);
    } 
    finally {
      setLoading(false);
    }
  };
  return (
    <>
      <p className="modalHeader">Welcome Back</p>
      <p className="modalSubHeader">
        Don't have an account?
        <a href="#" onClick={(e) => { e.preventDefault(); switchToRegister(); }} className="modalSubHeaderLink">
          Register
        </a>
      </p>
      <form onSubmit={handleSubmit} className="modalFormContainer">
        <label htmlFor="modalEmailContainer" className="modalEmailLabel">Email</label>
        <input
          type="email"
          id="modalEmailContainer"
          className="modalEmailContainer"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="modalPasswordContainer" className="modalPasswordLabel">Password</label>
        <input
          type="password"
          id="modalPasswordContainer"
          className="modalPasswordContainer"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="modalSubmitButton" disabled={loading}>
          {loading ? 'Logging in...' : 'Log in'}
        </button>

        {error && <p className="errorMessage">{error}</p>}
      </form>
      {showPopup && <Popup message={popupMessage} />}
    </>
  );
};

export default Login;

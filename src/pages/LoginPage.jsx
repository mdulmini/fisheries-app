/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('Fisher');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Sending OTP to:', phoneNumber);
    navigate('/verify-otp', { state: { phoneNumber, role } }); 
  };

  const handleSignUpRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form">
          <h1>Login to Fisheries </h1>
          <div className="role-selection">
            <button
              className={role === 'Fisher' ? 'active' : ''}
              onClick={() => setRole('Fisher')}
            >
              Fisher
            </button>
            <button
              className={role === 'Buyer' ? 'active' : ''}
              onClick={() => setRole('Buyer')}
            >
              Buyer
            </button>
          </div>
          
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-btn">
              Login as {role}
            </button>
          </form>
          <p>
            Don't have an account?{' '}
            <button className="signup-link" onClick={handleSignUpRedirect}>
              Sign up
            </button>
          </p>
        </div>
      </div>
      <div className="login-image">
        <h2>Welcome Back!.</h2>
        <p>Login to access your account</p>
      </div>
    </div>
  );
};

export default LoginPage;*/







import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('Fisher');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Sending OTP to:', phoneNumber);
        navigate('/verify-otp', { state: { phoneNumber, role, otp: data.otp } });
      } else {
        alert(data.message || 'Error sending OTP');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error sending OTP');
    }
  };

  const handleSignUpRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form">
          <h1>Login to Fisheries </h1>
          <div className="role-selection">
            <button
              className={role === 'Fisher' ? 'active' : ''}
              onClick={() => setRole('Fisher')}
            >
              Fisher
            </button>
            <button
              className={role === 'Buyer' ? 'active' : ''}
              onClick={() => setRole('Buyer')}
            >
              Buyer
            </button>
          </div>
          
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-btn">
              Login as {role}
            </button>
          </form>
          <p>
            Don't have an account?{' '}
            <button className="signup-link" onClick={handleSignUpRedirect}>
              Sign up
            </button>
          </p>
        </div>
      </div>
      <div className="login-image">
        <h2>Welcome Back!.</h2>
        <p>Login to access your account</p>
      </div>
    </div>
  );
};

export default LoginPage;






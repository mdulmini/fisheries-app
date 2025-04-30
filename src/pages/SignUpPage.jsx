/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUpPage.css';

const SignUpPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('Fisher');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log('Sending OTP to:', phoneNumber);
    navigate('/verify-otp', { state: { phoneNumber, role } }); 
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-form">
          <h1>Sign Up</h1>
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
          
          <form onSubmit={handleSignUp}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
            <button type="submit" className="signup-btn">
              Sign Up as {role}
            </button>
          </form>
          <p>
            Or <br />
            Already Registered?{' '}
            <button className="login-link" onClick={handleLoginRedirect}>
              Login
            </button>
          </p>
        </div>
      </div>
      <div className="signup-image">
        <h2>Welcome Back!.</h2>
        <p>Login to access your account</p>
      </div>
    </div>
  );
};

export default SignUpPage;*/





import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUpPage.css';

const SignUpPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('Fisher');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
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

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-form">
          <h1>Sign Up</h1>
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
          
          <form onSubmit={handleSignUp}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
            <button type="submit" className="signup-btn">
              Sign Up as {role}
            </button>
          </form>
          <p>
            Or <br />
            Already Registered?{' '}
            <button className="login-link" onClick={handleLoginRedirect}>
              Login
            </button>
          </p>
        </div>
      </div>
      <div className="signup-image">
        <h2>Welcome Back!.</h2>
        <p>Login to access your account</p>
      </div>
    </div>
  );
};

export default SignUpPage;







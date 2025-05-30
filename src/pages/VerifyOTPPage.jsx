/*import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/VerifyOTPPage.css';

const VerifyOTPPage = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const { state } = useLocation();
  const { phoneNumber, role } = state || {};
  const navigate = useNavigate();

  const handleOtpChange = (index, value) => {
    if (/^[0-9]$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    
    if (enteredOtp === '9876') {
      navigate('/verify-success', { state: { role } }); 
    } else {
      alert('Invalid OTP');
    }
  };

  const handleResend = () => {
    console.log('Resending OTP to:', phoneNumber);
  };

  return (
    <div className="verify-otp-page">
      <div className="verify-otp-container">
        <div className="verify-otp-form">
          <h1>Verify Your Phone Number</h1>
          <p>
            We have sent you an SMS with a code to number{' '}
            <strong>{phoneNumber || '+94 0123456789'}</strong>.
          </p>
          <div className="phone-number">
            <img src="https://flagcdn.com/w20/lk.png" alt="Sri Lanka Flag" />
            <span>+94 {phoneNumber || '0123456789'}</span>
          </div>
          <form onSubmit={handleVerify}>
            <div className="otp-inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  required
                />
              ))}
            </div>
            <button type="submit" className="verify-btn">
              Verify
            </button>
          </form>
          <p>
            Didn't receive the OTP?{' '}
            <button className="resend-link" onClick={handleResend}>
              Resend
            </button>
          </p>
        </div>
      </div>
      <div className="verify-otp-image">
        <h2>Welcome Back!.</h2>
        <p>Login to access your account</p>
      </div>
    </div>
  );
};

export default VerifyOTPPage;*/




/*import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/VerifyOTPPage.css';

const VerifyOTPPage = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const { state } = useLocation();
  const { phoneNumber, role, otp: generatedOtp } = state || {};
  const navigate = useNavigate();

  const handleOtpChange = (index, value) => {
    if (/^[0-9]$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    
    try {
      const response = await fetch('http://localhost:5000/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: enteredOtp }),
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/verify-success', { state: { role } });
      } else {
        alert(data.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error verifying OTP');
    }
  };

  const handleResend = async () => {
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
        console.log('Resent OTP:', data.otp);
      } else {
        alert(data.message || 'Error resending OTP');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error resending OTP');
    }
  };

  return (
    <div className="verify-otp-page">
      <div className="verify-otp-container">
        <div className="verify-otp-form">
          <h1>Verify Your Phone Number</h1>
          <p>
            We have sent you an SMS with a code to number{' '}
            <strong>{phoneNumber || '+94 0123456789'}</strong>.
          </p>
          <div className="phone-number">
            <img src="https://flagcdn.com/w20/lk.png" alt="Sri Lanka Flag" />
            <span>+94 {phoneNumber || '0123456789'}</span>
          </div>
          <form onSubmit={handleVerify}>
            <div className="otp-inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  required
                />
              ))}
            </div>
            <button type="submit" className="verify-btn">
              Verify
            </button>
          </form>
          <p>
            Didn't receive the OTP?{' '}
            <button className="resend-link" onClick={handleResend}>
              Resend
            </button>
          </p>
        </div>
      </div>
      <div className="verify-otp-image">
        <h2>Welcome Back!.</h2>
        <p>Login to access your account</p>
      </div>
    </div>
  );
};

export default VerifyOTPPage;*/





import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/VerifyOTPPage.css';

const VerifyOTPPage = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const { state } = useLocation();
  const { phoneNumber, role, otp: generatedOtp } = state || {};
  const navigate = useNavigate();

  const handleOtpChange = (index, value) => {
    if (/^[0-9]$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    
    try {
      const response = await fetch('http://localhost:5000/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: enteredOtp }),
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/verify-success', { state: { role } });
      } else {
        alert(data.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error verifying OTP');
    }
  };

  const handleResend = async () => {
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
        alert('OTP resent successfully: ' + data.otp);
        console.log('Resent OTP:', data.otp);
      } else {
        alert(data.message || 'Error resending OTP');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error resending OTP');
    }
  };

  return (
    <div className="verify-otp-page">
      <div className="verify-otp-container">
        <div className="verify-otp-form">
          <h1>Verify Your Phone Number</h1>
          <p>
            We have sent you an SMS with a code to number{' '}
            <strong>{phoneNumber || '+94 0123456789'}</strong>.
          </p>
          <div className="phone-number">
            <img src="https://flagcdn.com/w20/lk.png" alt="Sri Lanka Flag" />
            <span>+94 {phoneNumber || '0123456789'}</span>
          </div>
          <p className="otp-display">
            Your OTP is: <strong>{generatedOtp || 'N/A'}</strong> 
          </p>
          <form onSubmit={handleVerify}>
            <div className="otp-inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  required
                />
              ))}
            </div>
            <button type="submit" className="verify-btn">
              Verify
            </button>
          </form>
          <p>
            Didn't receive the OTP?{' '}
            <button className="resend-link" onClick={handleResend}>
              Resend
            </button>
          </p>
        </div>
      </div>
      <div className="verify-otp-image">
        <h2>Welcome Back!.</h2>
        <p>Login to access your account</p>
      </div>
    </div>
  );
};

export default VerifyOTPPage;

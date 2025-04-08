import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/VerifySuccessPage.css';

const VerifySuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="verify-success-page">
      <div className="verify-success-container">
        <div className="verify-success-message">
          <div className="check-icon">✔</div>
          <h1>Verify successful</h1>
        </div>
      </div>
      <div className="verify-success-image">
        <h2>Welcome Back!.</h2>
        <p>Login to access your account</p>
      </div>
    </div>
  );
};

export default VerifySuccessPage;


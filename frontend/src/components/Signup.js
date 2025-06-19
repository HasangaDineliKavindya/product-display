import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user'); // <-- Add role state
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!userName || !email || !password || !confirmPassword || !role) {
      setError('Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await fetch(' http://192.168.2.245:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: userName, email, password, role }), // <-- Send role
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMsg('Account created successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(data.error || 'Signup failed');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    }
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }
        body, html, #root {
          margin: 0; padding: 0; height: 100%;
          background: linear-gradient(135deg, #ffd8b5 0%, #fff3e0 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
        }
        .login-container {
          background: white;
          border-radius: 1rem;
          box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
          padding: 2rem 2.5rem;
          max-width: 400px;
          width: 100%;
          text-align: center;
          transition: box-shadow 0.3s, border 0.3s;
          position: relative;
          overflow: hidden;
          border: 3px solid ${role === 'admin' ? '#e53935' : '#ff9800'};
        }
        .login-container::before {
          content: '';
          position: absolute;
          top: -60px;
          right: -60px;
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, ${role === 'admin' ? '#e53935' : '#ff9800'} 60%, transparent 100%);
          opacity: 0.15;
          z-index: 0;
        }
        .login-title {
          font-size: 2.2rem;
          font-weight: 800;
          color: ${role === 'admin' ? '#e53935' : '#ff9800'};
          margin-bottom: 1.5rem;
          letter-spacing: 1px;
        }
        .login-error {
          background: #fee2e2;
          color: #b91c1c;
          border-radius: 0.5rem;
          padding: 0.75rem 1rem;
          margin-bottom: 1.25rem;
          font-weight: 600;
          font-size: 0.95rem;
          text-align: center;
          border: 1px solid #fca5a5;
          box-shadow: 0 2px 8px rgba(255,0,0,0.05);
        }
        .login-success {
          background: #ffe0b2;
          color: ${role === 'admin' ? '#e53935' : '#ff9800'};
          border-radius: 0.5rem;
          padding: 0.75rem 1rem;
          margin-bottom: 1.25rem;
          font-weight: 600;
          font-size: 0.95rem;
          text-align: center;
          border: 1px solid #ffecb3;
          box-shadow: 0 2px 8px rgba(255,152,0,0.05);
        }
        form.login-form {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          z-index: 1;
        }
        input.login-input, select.login-input {
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          border: 1.8px solid #ddd;
          font-size: 1rem;
          transition: border-color 0.3s, box-shadow 0.3s;
          outline: none;
          background: #fafafa;
        }
        input.login-input:focus, select.login-input:focus {
          border-color: ${role === 'admin' ? '#e53935' : '#ff9800'};
          box-shadow: 0 0 10px ${role === 'admin' ? 'rgba(229,57,53,0.18)' : 'rgba(255,152,0,0.18)'};
          background: #fffbe7;
        }
        button.login-button {
          margin-top: 0.5rem;
          background: linear-gradient(90deg, ${role === 'admin' ? '#e53935' : '#ff9800'} 60%, ${role === 'admin' ? '#ff8a80' : '#ffb74d'} 100%);
          color: white;
          border: none;
          border-radius: 0.6rem;
          padding: 0.95rem 0;
          font-size: 1.15rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.3s, transform 0.2s;
          box-shadow: 0 2px 8px ${role === 'admin' ? 'rgba(229,57,53,0.08)' : 'rgba(255,152,0,0.08)'};
        }
        button.login-button:hover {
          background: linear-gradient(90deg, ${role === 'admin' ? '#b71c1c' : '#fb8c00'} 60%, ${role === 'admin' ? '#ff5252' : '#ffd180'} 100%);
          transform: translateY(-2px) scale(1.03);
        }
        p.login-signup-text {
          margin-top: 1.2rem;
          font-size: 1rem;
          color: #6b7280;
          letter-spacing: 0.2px;
        }
        span.login-signup-link {
          color: ${role === 'admin' ? '#e53935' : '#ff9800'};
          font-weight: 700;
          cursor: pointer;
          transition: text-decoration 0.3s, color 0.2s;
        }
        span.login-signup-link:hover {
          text-decoration: underline;
          color: ${role === 'admin' ? '#b71c1c' : '#fb8c00'};
        }
        @media (max-width: 500px) {
          .login-container {
            padding: 1.2rem 0.5rem;
            max-width: 98vw;
          }
          .login-title {
            font-size: 1.5rem;
          }
        }
      `}</style>

      <div className="login-container">
        <h2 className="login-title">Sign Up</h2>

        {error && <p className="login-error">{error}</p>}
        {successMsg && <p className="login-success">{successMsg}</p>}

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Enter your User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="login-input"
          />
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
          {/* Role selection */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="login-input"
            style={{ cursor: 'pointer' }}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <input
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Confirm your Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="login-input"
          />

          <button type="submit" className="login-button">Sign Up</button>
        </form>

        <p className="login-signup-text">
          Already have an account?{' '}
          <span
            className="login-signup-link"
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </p>
      </div>
    </>
  );
}

export default Signup;

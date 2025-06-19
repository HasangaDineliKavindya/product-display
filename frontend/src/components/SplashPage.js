import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cubeImage from '../assets/W1.jpg';

function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/signup');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={styles.bg}>
      <div style={styles.container}>
        <img src={cubeImage} alt="Cube Logo" style={styles.image} />
        <h1 style={styles.title}>SAP Product Dashboard</h1>
        <p style={styles.subtitle}>Your smart way to view and manage inventory</p>
        <div style={styles.loader}>
          <span style={styles.dot}></span>
          <span style={styles.dot}></span>
          <span style={styles.dot}></span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  bg: {
    minHeight: '100vh',
    background: 'linear-gradient(120deg, #fff3e0 60%, #ff9800 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    background: 'rgba(255,255,255,0.97)',
    borderRadius: '1.5rem',
    boxShadow: '0 8px 32px rgba(255,152,0,0.13), 0 1.5px 8px rgba(255,152,0,0.07)',
    padding: '3rem 2.5rem 2.5rem 2.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: 350,
    maxWidth: 420,
    border: '2px solid #ff9800',
  },
  image: {
    width: 180,
    height: 180,
    objectFit: 'contain',
    marginBottom: 18,
    userSelect: 'none',
    filter: 'drop-shadow(0 2px 12px #ff980044)',
  },
  title: {
    fontSize: '2.2rem',
    fontWeight: 800,
    color: '#ff9800',
    letterSpacing: '1.5px',
    marginBottom: 10,
    textShadow: '1px 1px 6px #ffe0b2',
    fontFamily: "'Poppins', sans-serif",
  },
  subtitle: {
    fontSize: '1.13rem',
    color: '#ff9800',
    marginBottom: 30,
    fontWeight: 500,
    letterSpacing: '0.5px',
    fontFamily: "'Poppins', sans-serif",
    textShadow: '0 1px 8px #fff3e0',
  },
  loader: {
    display: 'flex',
    gap: 8,
    marginTop: 10,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: '50%',
    background: '#ff9800',
    animation: 'splash-bounce 1.2s infinite alternate',
    display: 'inline-block',
    animationDelay: '0s',
    boxShadow: '0 2px 8px #ff980055',
  },
};

// Add keyframes for loader animation
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes splash-bounce {
  0% { transform: translateY(0);}
  100% { transform: translateY(-12px);}
}
div[style*="loader"] span:nth-child(2) { animation-delay: 0.2s !important; }
div[style*="loader"] span:nth-child(3) { animation-delay: 0.4s !important; }
`;
document.head.appendChild(styleSheet);

export default SplashPage;

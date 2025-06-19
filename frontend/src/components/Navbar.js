import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Cubiklogo.png';


function Navbar() {
  const [hover, setHover] = useState(false);

  return (
    <nav style={styles.navbar}>
      <div style={styles.logoContainer}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <h1 style={styles.title}>SAP Product Dashboard</h1>
      </div>

      <div style={styles.navLinks}>
        <Link
          to="/profile"
          style={{
            ...styles.link,
            ...(hover ? styles.linkHover : {})
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Profile
        </Link>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    background: 'linear-gradient(90deg, #ff9800 0%, #ffc266 100%)', // changed to orange gradient
    padding: '0.8rem 2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 4px 12px rgba(255, 152, 0, 0.3)', // changed shadow to orange
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    height: '60px',
    marginRight: '1rem',
    filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.15))',
  },
  title: {
    fontSize: '1.5rem',
    color: 'white',
    fontWeight: '700',
    userSelect: 'none',
    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
  },
  navLinks: {
    display: 'flex',
    gap: '1.5rem',
  },
  link: {
    color: 'white',
    fontWeight: '600',
    fontSize: '1.1rem',
    textDecoration: 'none',
    padding: '0.4rem 0.7rem',
    borderRadius: '0.5rem',
    transition: 'background-color 0.3s ease',
    userSelect: 'none',
  },
  linkHover: {
    backgroundColor: 'rgba(255, 152, 0, 0.15)', // changed hover to orange tint
  },
};

export default Navbar;

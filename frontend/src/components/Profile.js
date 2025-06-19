import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const defaultPic = 'https://i.pravatar.cc/150?img=12';

  const [profilePic, setProfilePic] = useState(defaultPic);

  const user = {
    name: 'Hasanga Dineli Kavindya',
    role: 'Business Development Executive',
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfilePic(imageURL);
    }
  };

  const handleRemoveClick = () => {
    setProfilePic(defaultPic);
    navigate('/dashboard');
  };

  return (
    <div style={styles.container}>
      {/* Remove icon on top-right corner of the page */}
      <button
        onClick={handleRemoveClick}
        aria-label="Remove Profile Picture and go to Product Table"
        style={styles.removeButtonTopRight}
        title="Remove Profile Picture and go to Product Table"
      >
        &#10006;
      </button>

      <div style={styles.card}>
        <label
          htmlFor="profileImageInput"
          style={styles.imageLabel}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              document.getElementById('profileImageInput').click();
            }
          }}
          aria-label="Upload Profile Picture"
        >
          <img src={profilePic} alt="Profile" style={styles.image} />
        </label>
        <input
          type="file"
          id="profileImageInput"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
        <h2 style={styles.name}>{user.name}</h2>
        <p style={styles.role}>{user.role}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: 'linear-gradient(135deg, #ffd8b5 0%, #fff3e0 100%)', // subtle orange gradient
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Poppins', sans-serif",
    position: 'relative',
    transition: 'background 0.5s',
  },
  removeButtonTopRight: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#ff4d4d',
    border: 'none',
    borderRadius: '50%',
    color: 'white',
    width: '30px',
    height: '30px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '30px',
    textAlign: 'center',
    zIndex: 1000,
    boxShadow: '0 2px 8px rgba(255,77,77,0.15)',
    transition: 'background 0.3s, box-shadow 0.3s',
  },
  card: {
    backgroundColor: '#fff',
    padding: '2.5rem 2rem',
    borderRadius: '1.5rem',
    boxShadow: '0 10px 32px rgba(255, 152, 0, 0.10), 0 2px 8px rgba(0,0,0,0.06)',
    textAlign: 'center',
    maxWidth: '340px',
    minWidth: '260px',
    transition: 'box-shadow 0.3s',
    border: '2px solid #ff9800',
  },
  imageLabel: {
    display: 'inline-block',
    cursor: 'pointer',
    outline: 'none',
    transition: 'transform 0.2s',
  },
  image: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '1rem',
    border: '3px solid #ff9800',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    boxShadow: '0 4px 16px rgba(255,152,0,0.10)',
  },
  name: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '0.25rem',
    color: '#1f2937',
    letterSpacing: '0.5px',
    textShadow: '0 1px 2px rgba(255,152,0,0.08)',
  },
  role: {
    fontSize: '1rem',
    color: '#ff9800',
    fontWeight: '500',
    marginBottom: '1.2rem',
    letterSpacing: '0.2px',
  },
};

export default Profile;

import React from 'react';

function SearchBar({ searchTerm, onSearch }) {
  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="🔍 Search by code or name..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        style={styles.input}
        aria-label="Search products"
      />
    </div>
  );
}

const styles = {
  container: {
    margin: '28px auto 18px',
    textAlign: 'center',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  input: {
    padding: '14px 40px 14px 44px',
    width: '360px',
    borderRadius: '2rem',
    border: '2px solid #ff9800',
    fontSize: '1.13rem',
    outline: 'none',
    background: 'linear-gradient(90deg, #fffbe7 80%, #fff3e0 100%) url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' fill=\'%23ff9800\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath fill-rule=\'evenodd\' d=\'M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z\' clip-rule=\'evenodd\'/%3E%3C/svg%3E") no-repeat 16px center',
    backgroundSize: '22px 22px, 100% 100%',
    color: '#222',
    boxShadow: '0 4px 16px rgba(255,152,0,0.10)',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 500,
    letterSpacing: '0.5px',
    borderColor: '#ff9800',
  },
};

export default SearchBar;

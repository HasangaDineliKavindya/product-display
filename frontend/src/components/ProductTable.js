// ProductTable.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar'; // Assuming SearchBar component exists

const styles = {
  wrapper: {
    margin: '2rem auto',
    maxWidth: '1200px',
    padding: '2.5rem 2rem',
    background: 'linear-gradient(120deg, #f8fafc 60%, #fff3e0 100%)',
    borderRadius: '1.2rem',
    boxShadow: '0 8px 32px rgba(50, 50, 93, 0.13), 0 1.5px 8px rgba(0,0,0,0.07)',
    border: '1.5px solid #ffe0b2',
    position: 'relative',
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0,
    marginTop: '1.5rem',
    background: 'white',
    borderRadius: '0.8rem',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(255,152,0,0.06)',
  },
  headerCell: {
    background: 'linear-gradient(90deg, #ff9800 60%, #ffe0b2 100%)',
    color: '#fff',
    fontWeight: 700,
    padding: '1rem 0.75rem',
    border: 'none',
    textAlign: 'left',
    fontSize: '1rem',
    letterSpacing: '0.5px',
    borderBottom: '3px solid #ffb74d',
  },
  row: {
    borderBottom: '1.5px solid #ffe0b2',
    transition: 'background 0.2s',
  },
  cell: {
    padding: '0.95rem 0.75rem',
    border: 'none',
    fontSize: '0.95rem',
    background: 'transparent',
    color: '#333',
    verticalAlign: 'middle',
  },
  loading: {
    textAlign: 'center',
    color: '#2563eb',
    fontSize: '1.2rem',
    marginTop: '2rem',
    fontWeight: 600,
  },
  error: {
    textAlign: 'center',
    color: '#dc2626',
    fontSize: '1.2rem',
    marginTop: '2rem',
    fontWeight: 600,
    padding: '1rem',
    background: '#fee2e2',
    borderRadius: '0.5rem',
    border: '1px solid #fecaca',
  },
  empty: {
    textAlign: 'center',
    color: '#6b7280',
    fontStyle: 'italic',
    padding: '1.5rem',
    fontSize: '1.1rem',
  },
  stockIn: {
    padding: '0.95rem 0.75rem', 
    fontSize: '0.95rem', 
    verticalAlign: 'middle',   
    color: '#16a34a',
    fontWeight: 700,
    letterSpacing: '0.5px',
  },
  stockOut: {
    padding: '0.95rem 0.75rem', 
    fontSize: '0.95rem',          
    verticalAlign: 'middle',   
    color: '#e53935',
    fontWeight: 700,
    letterSpacing: '0.5px',
  },
  tableTitle: {
    fontSize: '2rem',
    fontWeight: 800,
    color: '#ff9800',
    letterSpacing: '1px',
    marginBottom: '0.5rem',
    textAlign: 'center',
  },
};

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); 

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(' http://192.168.2.245:5000/products');
        setProducts(response.data);
      } catch (err) {
        let errorMessage = 'Failed to fetch products.';
        if (err.response?.data?.error) {
          errorMessage = `${err.response.data.error}`;
          if(err.response.data.details) {
            errorMessage += ` (Details: ${err.response.data.details})`;
          }
        } else if (err.message) {
          errorMessage = err.message;
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    (product.code || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div style={styles.loading}>Loading products... Please wait.</div>;
  if (error) return <div style={styles.error}>Error: {error}</div>;

  return (
    <div style={styles.wrapper}>
      <div style={styles.tableTitle}>Product List</div>
      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.headerCell}>Item No</th>
            <th style={styles.headerCell}>Item Code</th>
            <th style={styles.headerCell}>Item Name</th>
            <th style={styles.headerCell}>Description</th>
            <th style={styles.headerCell}>WhsCode</th>
            <th style={styles.headerCell}>Quantity</th>
            <th style={styles.headerCell}>Stock Status</th>
            <th style={styles.headerCell}>Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length === 0 ? (
            <tr>
              <td colSpan="8" style={styles.empty}>No products found or SAP API is unavailable.</td>
            </tr>
          ) : (
            filteredProducts.map((product, idx) => (
              <tr key={product.id || idx} style={styles.row}>
                <td style={styles.cell}>{idx + 1}</td>
                <td style={styles.cell}>{product.code || '-'}</td>
                <td style={styles.cell}>{product.name || '-'}</td>
                <td style={styles.cell}>{product.description || '-'}</td>
                <td style={styles.cell}>{product.WhsCode || '-'}</td>
                <td style={styles.cell}>{product.OnHand}</td>
                <td style={product.OnHand > 0 ? styles.stockIn : styles.stockOut}>
                  {product.OnHand > 0 ? 'In Stock' : 'Out of Stock'}
                </td>
                <td style={styles.cell}>
                  {typeof product.price === 'number'
                    ? `Rs. ${product.price.toLocaleString('en-LK', { minimumFractionDigits: 2 })}`
                    : 'N/A'}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
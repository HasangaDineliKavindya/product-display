// server.js
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const axios = require('axios');
const pool = require('./db');
require('dotenv').config(); // Ensure environment variables are loaded

const app = express();
// FIX #1: Use the port provided by the hosting environment (Render)
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- SAP API Configuration ---
// FIX #2: Get credentials from environment variables, NOT hardcoded
const SAP_API_URL = process.env.SAP_API_URL; // e.g., 'http://10.0.0.237:4000/api/inv'
const SAP_AUTH_USER = process.env.SAP_AUTH_USER; // e.g., 'cubik'
const SAP_AUTH_PASS = process.env.SAP_AUTH_PASS; // e.g., 'secret@cubik@20615'

// Helper function to create Basic Auth header for SAP API
const getSapAuthHeader = () => {
  if (!SAP_AUTH_USER || !SAP_AUTH_PASS) {
    console.error("SAP authentication credentials are not set in environment variables.");
    return null;
  }
  const token = Buffer.from(`${SAP_AUTH_USER}:${SAP_AUTH_PASS}`, 'utf8').toString('base64');
  return `Basic ${token}`;
};

// --- ROUTES ---

// PRODUCTS Route (No logical changes, but now relies on environment variables)
app.get('/products', async (req, res) => {
  try {
    const authHeader = getSapAuthHeader();
    if (!authHeader || !SAP_API_URL) {
      return res.status(500).json({ error: 'SAP API connection details are not configured on the server.' });
    }

    console.log(`[${new Date().toISOString()}] Attempting to fetch products from SAP API: ${SAP_API_URL}`);

    const sapResponse = await axios.get(SAP_API_URL, {
      headers: { 'Authorization': authHeader, 'Accept': 'application/json' },
      timeout: 15000,
    });

    console.log(`[${new Date().toISOString()}] Successfully received response from SAP API. Status: ${sapResponse.status}`);
    let rawProducts = sapResponse.data;

    if (!Array.isArray(rawProducts)) {
      console.error('SAP API response is not an array. Raw Data:', JSON.stringify(rawProducts, null, 2));
      return res.status(500).json({ error: 'Unexpected data format from SAP API.' });
    }

    const products = rawProducts.map((sapProduct, index) => {
      const code = sapProduct.ItemCode || sapProduct.itemCode;
      const whsCode = sapProduct.WhsCode || 'N/A';
      const uniqueId = `${code}-${whsCode}-${index}`;
      return { id: uniqueId, code: String(code || ''), name: String(sapProduct.ItemName || sapProduct.itemName || 'N/A'), description: String(sapProduct.FrgnName || ''), price: parseFloat(sapProduct.Price ?? 0), OnHand: parseFloat(sapProduct.OnHand ?? 0), WhsCode: whsCode };
    }).filter(p => p.code);

    console.log(`[${new Date().toISOString()}] Processed ${products.length} individual records to send to client.`);
    res.status(200).json(products);

  } catch (err) {
    // Error handling logic remains the same
    console.error(`[${new Date().toISOString()}] Error fetching products from SAP:`, err.message);
    if (err.response) {
      console.error('SAP API Response Status:', err.response.status);
      console.error('SAP API Response Data:', JSON.stringify(err.response.data, null, 2));
      res.status(err.response.status).json({ error: 'Failed to fetch products from SAP API', details: err.response.data });
    } else if (err.request) {
      console.error('SAP API No response. Axios error code:', err.code);
      res.status(504).json({ error: 'No response from SAP API (Check network/firewall or if the SAP server is accessible from the cloud)', details: err.code });
    } else {
      console.error('SAP API Request Setup Error:', err.message);
      res.status(500).json({ error: 'Internal server error while contacting SAP API' });
    }
  }
});

// SIGNUP and LOGIN Routes (No changes needed)
app.post('/signup', async (req, res) => { /* ... your existing code ... */ });
app.post('/login', async (req, res) => { /* ... your existing code ... */ });


// --- FIX #3: Use a generic listen call suitable for any environment ---
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // Add checks to see if critical env vars are loaded
  if (!SAP_API_URL || !SAP_AUTH_USER) {
      console.warn('WARNING: SAP API environment variables are not set. The /products route will fail.');
  } else {
      console.log(`Server configured to connect to SAP API endpoint.`);
  }
});
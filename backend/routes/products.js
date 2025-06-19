const express = require('express');
const router = express.Router();
const pool = require('../db');
// Get all products from local DB
router.get('/products', (req, res) => {
  res.json([
    {
      "ItemCode": "00012090",
      "ItemName": "MODIK IEC Key Lock",
      "FrgnName": null,
      "SuppCatNum": null,
      "Price": 620.38,
      "WhsCode": "01",
      "OnHand": 0
    },
    {
      "ItemCode": "00012090",
      "ItemName": "MODIK IEC Key Lock",
      "FrgnName": null,
      "SuppCatNum": null,
      "Price": 620.38,
      "WhsCode": "BGR",
      "OnHand": 0
    }
  ]);
});

// Get all products from  sap api http://10.0.0.237:4000/api/inv
router.get('/external-products', async (req, res) => {
  try {
    const response = await fetch(' http://10.0.0.237:5000/api/inv');
    const products = await response.json();
    res.json(products);
  } catch (err) {
    console.error('External fetch error:', err);
      res.status(500).json({ error: 'External API error' });
    }
  });

// Add a product
router.post('/products', async (req, res) => {
  const { name, description, price, quantity } = req.body;

  try {
    await pool.query(
      'INSERT INTO product (name, description, price, quantity, image_url) VALUES (?, ?, ?, ?, ?)',
      [name, description, price, quantity]
    );
    res.status(201).json({ message: 'Product added successfully' });
  } catch (err) {
    console.error('Insert error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a product
router.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity} = req.body;

  try {
    await pool.query(
      'UPDATE product SET name = ?, description = ?, price = ?, quantity = ?, image_url = ? WHERE id = ?',
      [name, description, price, quantity, id]
    );
    res.json({ message: 'Product updated successfully' });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a product
router.delete('/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM product WHERE id = ?', [id]);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

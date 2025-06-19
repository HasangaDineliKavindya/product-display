import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

import Navbar from './components/Navbar';
import ProductTable from './components/ProductTable';
import Login from './components/Login';
import Profile from './components/Profile';
import SplashPage from './components/SplashPage';
import Signup from './components/Signup';
import SearchBar from './components/SearchBar';

function Dashboard({ setSearchTerm, filteredProducts }) {
  return (
    <>
      <Navbar setSearchTerm={setSearchTerm} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-10"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          📦 Product Details
        </h1>
        <ProductTable products={filteredProducts} />
      </motion.div>
    </>
  );
}

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get(' http://192.168.2.245:5000/products') // Correct endpoint for products
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Axios error:', error));
  }, []);

  const filteredProducts = products.filter((product) =>
    (product.name || product.ItemName || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Router>
      <div className="bg-gray-50 min-h-screen font-poppins">
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/searchbar" element={<SearchBar />} />
          <Route
            path="/dashboard"
            element={<Dashboard setSearchTerm={setSearchTerm} filteredProducts={filteredProducts} />}
          />
          <Route
            path="/producttable"
            element={<ProductTable products={filteredProducts} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

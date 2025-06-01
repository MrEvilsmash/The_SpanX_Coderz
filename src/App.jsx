// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './admin/Dashboard';
import NotFound from './pages/NotFound';

const App = () => {
  const [filters, setFilters] = useState({ brands: [], categories: [] });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-white">
        <Navbar
          onFilterChange={setFilters}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* ✅ Removed duplicate overlay */}

        <main
          className={`relative z-10 pt-14 px-4 transition-all duration-300 ${
            sidebarOpen ? 'md:ml-72' : ''
          }`}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products filters={filters} />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;

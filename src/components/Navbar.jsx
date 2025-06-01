// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingCart, FiHeart, FiHome, FiGrid } from 'react-icons/fi';

const brands = ['Tanishq', 'Kalyan', 'CaratLane', 'PC Jeweller', 'Malabar Gold'];
const categories = ['Necklace', 'Ring', 'Earrings', 'Bracelet'];

const Navbar = ({ onFilterChange, sidebarOpen, setSidebarOpen }) => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({ brands: selectedBrands, categories: selectedCategories });
    }
  }, [selectedBrands, selectedCategories, onFilterChange]);

  return (
    <>
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-gray-900 text-white flex items-center justify-between px-4 py-3 z-50 shadow-md">
        <button
          className="text-2xl"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open Sidebar"
        >
          <FiMenu />
        </button>

        <Link to="/" className="text-xl font-bold tracking-wide">
          Jewellery Shop
        </Link>

        <div className="flex items-center space-x-5 text-xl">
          <Link to="/favorites" aria-label="Favorites" className="hover:text-yellow-400">
            <FiHeart />
          </Link>
          <Link to="/cart" aria-label="Cart" className="hover:text-yellow-400 relative">
            <FiShoppingCart />
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black rounded-full text-xs px-1 font-bold">
              3
            </span>
          </Link>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-72 bg-gray-800 text-white shadow-lg z-50
          transform transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Close Sidebar"
            className="text-2xl"
          >
            <FiX />
          </button>
        </div>

        {/* Brands */}
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-md font-semibold mb-2">Brands</h3>
          <div className="flex flex-col space-y-1">
            {brands.map((brand) => (
              <label
                key={brand}
                className="flex items-center space-x-2 cursor-pointer hover:text-yellow-400"
              >
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                  className="form-checkbox h-4 w-4 text-yellow-400"
                />
                <span>{brand}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-md font-semibold mb-2">Categories</h3>
          <div className="flex flex-col space-y-1">
            {categories.map((cat) => (
              <label
                key={cat}
                className="flex items-center space-x-2 cursor-pointer hover:text-yellow-400"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="form-checkbox h-4 w-4 text-yellow-400"
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Reset Filters */}
        <div className="p-4">
          <button
            onClick={() => {
              setSelectedBrands([]);
              setSelectedCategories([]);
            }}
            className="bg-yellow-400 text-gray-900 font-semibold px-4 py-2 rounded hover:bg-yellow-500"
          >
            Reset Filters
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        />
      )}

      {/* Bottom Navbar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white flex justify-around items-center py-2 px-4 md:hidden z-50 border-t border-gray-700">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'flex flex-col items-center text-yellow-400' : 'flex flex-col items-center hover:text-yellow-300'
          }
        >
          <FiHome size={24} />
          <span className="text-xs mt-1">Home</span>
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? 'flex flex-col items-center text-yellow-400' : 'flex flex-col items-center hover:text-yellow-300'
          }
        >
          <FiGrid size={24} />
          <span className="text-xs mt-1">Categories</span>
        </NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive ? 'flex flex-col items-center text-yellow-400' : 'flex flex-col items-center hover:text-yellow-300'
          }
        >
          <FiHeart size={24} />
          <span className="text-xs mt-1">Favorites</span>
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? 'flex flex-col items-center text-yellow-400 relative' : 'flex flex-col items-center hover:text-yellow-300 relative'
          }
        >
          <FiShoppingCart size={24} />
          <span className="text-xs mt-1">Cart</span>
          <span className="absolute top-0 right-3 bg-yellow-400 text-black rounded-full text-xs px-1 font-bold">
            3
          </span>
        </NavLink>
      </nav>

      {/* Spacer for bottom nav on mobile */}
      <div className="h-14 md:hidden"></div>
    </>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  FiMenu,
  FiX,
  FiShoppingCart,
  FiHeart,
  FiHome,
  FiGrid,
  FiFilter,
} from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const brands = ['Tanishq', 'Malabar Gold', 'GRT', 'PC Jeweller', 'Kalyan', 'CaratLane'];
const categories = ['Necklace', 'Ring', 'Bracelet', 'Earrings']; 
// ^ Must exactly match product categories

const Navbar = ({ onFilterChange, sidebarOpen, setSidebarOpen }) => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { cartItems } = useCart();
  const location = useLocation();

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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

  const applyFilters = () => {
  console.log('Final Filters Being Sent:', {
    brands: selectedBrands,
    categories: selectedCategories
  });
  onFilterChange({
    brands: selectedBrands,
    categories: selectedCategories
  });
  setSidebarOpen(false);
};

  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    onFilterChange({ brands: [], categories: [] });
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

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
        

        <div className="flex items-center space-x-4 text-xl">
          {location.pathname === '/products' && (
            <button
              onClick={toggleSidebar}
              aria-label="Toggle Filter"
              className="hover:text-yellow-400"
              title="Toggle Filter"
            >
              <FiFilter />
            </button>
          )}

          <Link to="/favourites" aria-label="Favorites" className="hover:text-yellow-400">
            <FiHeart />
          </Link>

          <Link to="/cart" aria-label="Cart" className="hover:text-yellow-400 relative">
            <FiShoppingCart />
            {totalCartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black rounded-full text-xs px-1 font-bold">
                {totalCartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-72 bg-gray-800 text-white shadow-lg z-50 transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
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

        {/* Buttons */}
        <div className="p-4 flex space-x-2">
          <button
            onClick={resetFilters}
            className="bg-yellow-400 text-gray-900 font-semibold px-4 py-2 rounded hover:bg-yellow-500 flex-1"
          >
            Reset Filters
          </button>
          <button
            onClick={applyFilters}
            className="bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-green-600 flex-1"
          >
            Apply Filters
          </button>
        </div>
      </aside>

      {/* Bottom Navbar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white flex justify-around items-center py-2 px-4 md:hidden z-50 border-t border-gray-700">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? 'flex flex-col items-center text-yellow-400'
              : 'flex flex-col items-center hover:text-yellow-300'
          }
        >
          <FiHome size={24} />
          <span className="text-xs mt-1">Home</span>
        </NavLink>

        <button
          onClick={toggleSidebar}
          className="flex flex-col items-center hover:text-yellow-300"
          aria-label="Toggle Filter Sidebar"
        >
          <FiGrid size={24} />
          <span className="text-xs mt-1">Categories</span>
        </button>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive
              ? 'flex flex-col items-center text-yellow-400'
              : 'flex flex-col items-center hover:text-yellow-300'
          }
        >
          <FiHeart size={24} />
          <span className="text-xs mt-1">Favorites</span>
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive
              ? 'flex flex-col items-center text-yellow-400 relative'
              : 'flex flex-col items-center hover:text-yellow-300 relative'
          }
        >
          <FiShoppingCart size={24} />
          <span className="text-xs mt-1">Cart</span>
          {totalCartCount > 0 && (
            <span className="absolute top-0 right-3 bg-yellow-400 text-black rounded-full text-xs px-1 font-bold">
              {totalCartCount}
            </span>
          )}
        </NavLink>
      </nav>

      {/* Spacer for bottom nav on mobile */}
      <div className="h-14 md:hidden"></div>
    </>
  );
};

export default Navbar;
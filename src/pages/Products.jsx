import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import allProducts from '../data/products';
import Navbar from '../components/Navbar';

const Products = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({ brands: [], categories: [] });
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const applyFilters = () => {
      const filtered = allProducts.filter((product) => {
        const matchBrand =
          activeFilters.brands.length === 0 ||
          activeFilters.brands.includes(product.brand);

        const matchCategory =
          activeFilters.categories.length === 0 ||
          activeFilters.categories.includes(product.category);

        return matchBrand && matchCategory;
      });
      setFilteredProducts(filtered);
    };

    applyFilters();
  }, [activeFilters]);

  return (
    <>
      <Navbar
        onFilterChange={setActiveFilters}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main className="pt-20 px-4 pb-24 md:px-8 bg-white min-h-screen">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">All Products</h2>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg mb-4">
              No products match your filters.
            </p>
            <button
              onClick={() => setActiveFilters({ brands: [], categories: [] })}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>
    </>
  );
};

export default Products;
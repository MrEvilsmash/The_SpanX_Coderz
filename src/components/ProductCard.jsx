// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-300">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-yellow-600 font-bold mt-1">${product.price}</p>
      </Link>
    </div>
  );
};

export default ProductCard;

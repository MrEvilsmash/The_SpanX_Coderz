import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FavouritesContext } from '../context/FavouritesContext';
import { useCart } from '../context/CartContext';  // Import cart hook
import { FiHeart, FiShoppingCart } from 'react-icons/fi';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { favourites, toggleFavourite } = useContext(FavouritesContext);
  const { addToCart } = useCart(); // get addToCart from context

  const isFavourite = favourites.some((item) => item._id === product._id);

  return (
    <div
      className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 cursor-pointer flex flex-col justify-between"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md"
      />

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{product.brand}</p>

        <div className="flex items-center gap-1 text-yellow-500 mt-1">★★★★☆</div>

        <p className="text-xl font-bold text-amber-600 mt-2">${product.price}</p>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent parent click
            toggleFavourite(product);
          }}
          className={`flex items-center justify-center px-4 py-1 rounded-md ${
            isFavourite ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}
        >
          <FiHeart className="mr-2" />
          {isFavourite ? 'Remove Favourite' : 'Add to Favourite'}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent parent click
            addToCart(product); // Add product to cart here
          }}
          className="bg-amber-500 hover:bg-amber-600 text-white py-1 rounded-md flex-1"
        >
          <FiShoppingCart className="inline mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

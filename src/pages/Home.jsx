import React from 'react';
import { Link } from 'react-router-dom';



import diamondRing from '../assets/diamond-ring.jpg';
import goldNecklace from '../assets/diamond-ring.jpg';
import silverBracelet from '../assets/diamond-ring.jpg';


const products = [
  {
    id: 1,
    name: 'Diamond Ring',
    image: diamondRing,
    price: '$1200',
  },
  {
    id: 2,
    name: 'Gold Necklace',
    image: goldNecklace,
    price: '$850',
  },
  {
    id: 3,
    name: 'Silver Bracelet',
    image: silverBracelet,
    price: '$450',
  },
];

// ... rest of your Home component


const Home = () => {
  return (
    <div className="pt-20 px-4 md:px-10 bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome to Jewellery Shop
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Explore timeless pieces designed to sparkle with elegance.
        </p>
      </div>

      {/* Featured Products */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-600">{product.price}</p>
                <Link to={`/product/${product.id}`} className="text-blue-500 text-sm mt-2 inline-block">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

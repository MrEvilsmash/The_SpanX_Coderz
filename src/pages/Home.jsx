import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick'; // import slider
import offers from '../data/offersData'; // import offers data
import diamondRing from '../assets/diamond-ring.jpg';
import goldNecklace from '../assets/diamond-ring.jpg';
import silverBracelet from '../assets/diamond-ring.jpg';
import diamondEarrings from '../assets/diamond-ring.jpg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const products = [
  {
    id: 1,
    name: 'Diamond Ring',
    image: diamondRing,
    price: 120000,
    brand: 'Tanishq',
    category: 'Ring',
  },
  {
    id: 2,
    name: 'Gold Necklace',
    image: goldNecklace,
    price: 85000,
    brand: 'Kalyan',
    category: 'Necklace',
  },
  {
    id: 3,
    name: 'Silver Bracelet',
    image: silverBracelet,
    price: 45000,
    brand: 'CaratLane',
    category: 'Bracelet',
  },
  {
    id: 4,
    name: 'Diamond Earrings',
    image: diamondEarrings,
    price: 95000,
    brand: 'Malabar Gold',
    category: 'Earrings',
  },
];

const formatPrice = (price) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(price);

const Home = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="pt-15 px-4 md:px-5 bg-white min-h-screen">
      {/* Offers Slider */}
      <section className="mb-12 -mx-4 md:mx-0">
        <Slider {...sliderSettings}>
          {offers.map((offer) => (
            <Link
              to={offer.link}
              key={offer.id}
              className="relative block rounded-xl overflow-hidden shadow-lg"
            >
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
                <h2 className="text-3xl font-bold">{offer.title}</h2>
                <p className="mt-1">{offer.description}</p>
              </div>
            </Link>
          ))}
        </Slider>
      </section>

      {/* Hero */}
      <section className="text-center py-16 bg-gradient-to-r from-yellow-100 to-pink-100 rounded-3xl shadow-inner mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Discover Elegant Jewellery
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto mb-6">
          Sparkle every moment with timeless pieces of beauty and luxury.
        </p>
        <Link
          to="/products"
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg inline-block transition"
        >
          Shop Now
        </Link>
      </section>

      {/* Featured Products */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Featured Products</h2>
          <Link to="/products" className="text-indigo-600 hover:text-indigo-800 font-medium">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transform hover:-translate-y-1 transition duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.brand}</p>
                <p className="text-yellow-600 font-bold">{formatPrice(product.price)}</p>
                <Link
                  to={`/product/${product.id}`}
                  className="block mt-3 text-center bg-gray-900 text-white py-2 rounded hover:bg-gray-800 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

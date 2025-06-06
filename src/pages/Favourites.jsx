import React, { useContext } from 'react';
import { FavouritesContext } from '../context/FavouritesContext';
import ProductCard from '../components/ProductCard';

const Favourites = () => {
  const { favourites } = useContext(FavouritesContext);

  if (favourites.length === 0) {
    return <p className="p-4 text-center">No favourites yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {favourites.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Favourites;

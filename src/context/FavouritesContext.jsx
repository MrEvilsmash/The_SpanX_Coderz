// src/context/FavouritesContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  // Try to load favourites from localStorage so they persist on refresh
  const [favourites, setFavourites] = useState(() => {
    const stored = localStorage.getItem('favourites');
    return stored ? JSON.parse(stored) : [];
  });

  // Save favourites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  // Add or remove a product from favourites
  const toggleFavourite = (product) => {
    setFavourites((prev) => {
      const exists = prev.find((item) => item._id === product._id);
      if (exists) {
        // Remove from favourites
        return prev.filter((item) => item._id !== product._id);
      } else {
        // Add to favourites
        return [...prev, product];
      }
    });
  };

  return (
    <FavouritesContext.Provider value={{ favourites, toggleFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
};

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './context/CartContext';
import { FavouritesProvider } from './context/FavouritesContext'; // import the favourites provider
import './index.css'; // or wherever your Tailwind CSS file is

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <FavouritesProvider>
        <App />
      </FavouritesProvider>
    </CartProvider>
  </React.StrictMode>
);

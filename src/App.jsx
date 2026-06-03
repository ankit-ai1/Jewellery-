import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { UserProvider } from './context/UserContext';
import { router } from './routes';
import './styles/global.css';
import './styles/variables.css';

function App() {
  return (
    <HelmetProvider>
      <CartProvider>
        <WishlistProvider>
          <UserProvider>
            <RouterProvider router={router} />
          </UserProvider>
        </WishlistProvider>
      </CartProvider>
    </HelmetProvider>
  );
}

export default App;

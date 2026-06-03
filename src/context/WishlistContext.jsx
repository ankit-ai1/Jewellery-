import React, { createContext, useState, useCallback, useEffect } from 'react';
import { getFromStorage, saveToStorage } from '../utils/helpers';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = getFromStorage('lumoria_wishlist', []);
    setWishlist(savedWishlist);
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    saveToStorage('lumoria_wishlist', wishlist);
  }, [wishlist]);

  const addToWishlist = useCallback((product) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.some((item) => item.id === product.id)) {
        return prevWishlist;
      }
      return [
        ...prevWishlist,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          material: product.material,
          rating: product.rating,
          reviews: product.reviews,
          badge: product.badge,
        },
      ];
    });
  }, []);

  const removeFromWishlist = useCallback((productId) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item.id !== productId)
    );
  }, []);

  const toggleWishlist = useCallback((product) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.some((item) => item.id === product.id)) {
        return prevWishlist.filter((item) => item.id !== product.id);
      }
      return [
        ...prevWishlist,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          material: product.material,
          rating: product.rating,
          reviews: product.reviews,
          badge: product.badge,
        },
      ];
    });
  }, []);

  const isInWishlist = useCallback(
    (productId) => {
      return wishlist.some((item) => item.id === productId);
    },
    [wishlist]
  );

  const clearWishlist = useCallback(() => {
    setWishlist([]);
  }, []);

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
};

import React, { createContext, useState, useCallback, useEffect } from 'react';
import { getFromStorage, saveToStorage } from '../utils/helpers';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = getFromStorage('lumoria_user', null);
    setUser(savedUser);
    setIsLoading(false);
  }, []);

  const login = useCallback((userData) => {
    const completeUserData = {
      id: userData.id || Math.random().toString(36).substr(2, 9),
      email: userData.email,
      name: userData.name,
      phone: userData.phone || null,
      addresses: userData.addresses || [],
      loginTime: new Date().toISOString(),
      ...userData,
    };
    setUser(completeUserData);
    saveToStorage('lumoria_user', completeUserData);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('lumoria_user');
  }, []);

  const updateProfile = useCallback((updates) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    saveToStorage('lumoria_user', updatedUser);
  }, [user]);

  const addAddress = useCallback(
    (address) => {
      if (!user) return;
      const newAddress = {
        id: Math.random().toString(36).substr(2, 9),
        ...address,
      };
      const updatedUser = {
        ...user,
        addresses: [...(user.addresses || []), newAddress],
      };
      setUser(updatedUser);
      saveToStorage('lumoria_user', updatedUser);
      return newAddress;
    },
    [user]
  );

  const removeAddress = useCallback(
    (addressId) => {
      if (!user) return;
      const updatedUser = {
        ...user,
        addresses: user.addresses.filter((addr) => addr.id !== addressId),
      };
      setUser(updatedUser);
      saveToStorage('lumoria_user', updatedUser);
    },
    [user]
  );

  const isAuthenticated = !!user;

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateProfile,
    addAddress,
    removeAddress,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

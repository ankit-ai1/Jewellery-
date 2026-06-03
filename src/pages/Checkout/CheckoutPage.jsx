import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks';
import { CheckoutPage as BaseCheckoutPage } from '../BasicPages';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login?redirect=/checkout', {
        replace: true,
        state: { message: 'Please login to continue with checkout.' },
      });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading || !isAuthenticated) {
    return null;
  }

  return <BaseCheckoutPage />;
};

export default CheckoutPage;

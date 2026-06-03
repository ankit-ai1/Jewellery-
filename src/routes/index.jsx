import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/Home/HomePage';

// Lazy load pages
const ShopPage = lazy(() => import('../pages/Shop/ShopPage'));
const ProductDetailsPage = lazy(() => import('../pages/ProductDetails/ProductDetailsPage'));
const CartPage = lazy(() => import('../pages/Cart/CartPage'));
const CheckoutPage = lazy(() => import('../pages/Checkout/CheckoutPage'));
const WishlistPage = lazy(() => import('../pages/Wishlist/WishlistPage'));
const AccountPage = lazy(() => import('../pages/Account/AccountPage'));
const LoginPage = lazy(() => import('../pages/Auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/Auth/RegisterPage'));
const AboutPage = lazy(() => import('../pages/About/AboutPage'));
const ContactPage = lazy(() => import('../pages/Contact/ContactPage'));
const NewArrivalsPage = lazy(() => import('../pages/NewArrivals/NewArrivalsPage'));
const BestSellersPage = lazy(() => import('../pages/BestSellers/BestSellersPage'));
const FineGoldPage = lazy(() => import('../pages/FineGold/FineGoldPage'));
const CollectionsPage = lazy(() => import('../pages/Collections/CollectionsPage'));
const GiftingPage = lazy(() => import('../pages/Gifting/GiftingPage'));
const BlogDetails = lazy(() => import('../pages/Journal/BlogDetails'));
const CollectionsLandingPage = lazy(() => import('../pages/Collections/CollectionsLandingPage'));
const FAQPage = lazy(() => import('../pages/FAQ/FAQPage'));
const ShippingPage = lazy(() => import('../pages/Shipping/ShippingPage'));
const ReturnsPage = lazy(() => import('../pages/Returns/ReturnsPage'));
const PrivacyPolicyPage = lazy(() => import('../pages/Legal/PrivacyPolicyPage'));
const TermsPage = lazy(() => import('../pages/Legal/TermsPage'));

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'shop',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ShopPage />
          </Suspense>
        ),
      },
      {
        path: 'product/:id',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ProductDetailsPage />
          </Suspense>
        ),
      },
      {
        path: 'cart',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <CartPage />
          </Suspense>
        ),
      },
      {
        path: 'checkout',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <CheckoutPage />
          </Suspense>
        ),
      },
      {
        path: 'wishlist',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <WishlistPage />
          </Suspense>
        ),
      },
      {
        path: 'login',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: 'register',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <RegisterPage />
          </Suspense>
        ),
      },
      {
        path: 'account',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AccountPage />
          </Suspense>
        ),
      },
      {
        path: 'new-arrivals',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <NewArrivalsPage />
          </Suspense>
        ),
      },
      {
        path: 'best-sellers',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <BestSellersPage />
          </Suspense>
        ),
      },
      {
        path: 'fine-gold',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <FineGoldPage />
          </Suspense>
        ),
      },
      {
        path: 'collections',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <CollectionsLandingPage />
          </Suspense>
        ),
      },
      {
        path: 'collections/:collectionId',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <CollectionsPage />
          </Suspense>
        ),
      },
      {
        path: 'gifting/*',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <GiftingPage />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: 'contact',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ContactPage />
          </Suspense>
        ),
      },
      {
        path: 'journal/:slug',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <BlogDetails />
          </Suspense>
        ),
      },
      {
        path: 'faq',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <FAQPage />
          </Suspense>
        ),
      },
      {
        path: 'shipping',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ShippingPage />
          </Suspense>
        ),
      },
      {
        path: 'returns',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ReturnsPage />
          </Suspense>
        ),
      },
      {
        path: 'privacy-policy',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <PrivacyPolicyPage />
          </Suspense>
        ),
      },
      {
        path: 'terms',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <TermsPage />
          </Suspense>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

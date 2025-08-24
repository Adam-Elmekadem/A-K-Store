import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CartPage from './components/cart/CartPage';
import AdminDashboard from './components/admin/AdminDashboard';
import GlobalLoginModal from './components/GlobalLoginModal';
import { useToast } from './/hooks/useToast';
import ToastContainer from './components/ui/ToastContainer';
import './App.css';
import AboutUs from './components/aboutus/aboutUs';
import Shop from './components/shop/shop';
import Contact from './components/contact/contact'; // Add this import


export default function App() {
  const { toasts, showToast, removeToast } = useToast();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} /> {/* Add this line */}
      </Routes>
      <GlobalLoginModal />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </BrowserRouter>
  );
}

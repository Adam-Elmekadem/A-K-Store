import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-4 border-t border-red-AKred">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
        {/* Branding & Contact */}
        <div className="flex flex-col items-center md:items-start col-span-1">
          <span className="text-2xl font-Guardian font-bold red-AKred mb-2">AkKStore</span>
          <p className="text-gray-400 font-poppins text-sm mb-2">Luxury fashion, curated for you.</p>
          <p className="text-gray-500 font-poppins text-xs mb-4">© {new Date().getFullYear()} AkKStore. All rights reserved.</p>
          <div className="text-left text-gray-300 font-poppins text-sm">
            <div className="mb-1"><span className="font-bold">Email:</span> <a href="mailto:contact@akstore.com" className="hover:red-AKred">contact@akstore.com</a></div>
            <div className="mb-1"><span className="font-bold">Phone:</span> <a href="tel:+212618981078" className="hover:red-AKred">+212 6 18 98 10 78</a></div>
            <div className="mb-1"><span className="font-bold">Location:</span> Salé, Morocco</div>
          </div>
        </div>
        {/* Navigation */}
        <div className="flex flex-col items-center md:items-start col-span-1">
          <span className="font-bold text-gray-300 mb-2">Navigation</span>
          <Link to="/" className="font-poppins text-gray-300 hover:red-AKred transition">Home</Link>
          <Link to="/shop" className="font-poppins text-gray-300 hover:red-AKred transition">Shop</Link>
          <Link to="/about" className="font-poppins text-gray-300 hover:red-AKred transition">About</Link>
          <Link to="/contact" className="font-poppins text-gray-300 hover:red-AKred transition">Contact</Link>
        </div>
        {/* Social Media */}
        <div className="flex flex-col items-center md:items-start col-span-1">
          <span className="font-bold text-gray-300 mb-2">Follow Us</span>
          <a href="https://facebook.com/akstore" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:red-AKred transition mb-1"><i className="fab fa-facebook-f"></i> Facebook</a>
          <a href="https://instagram.com/akstore" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:red-AKred transition mb-1"><i className="fab fa-instagram"></i> Instagram</a>
          <a href="https://twitter.com/akstore" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:red-AKred transition mb-1"><i className="fab fa-twitter"></i> Twitter</a>
          <a href="https://linkedin.com/company/akstore" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:red-AKred transition mb-1"><i className="fab fa-linkedin-in"></i> LinkedIn</a>
        </div>
        {/* Partners */}
        <div className="flex flex-col items-center md:items-start col-span-1">
          <span className="font-bold text-gray-300 mb-2">Partners</span>
          <a href="https://nike.com" target="_blank" rel="noopener noreferrer" className="font-poppins text-gray-300 hover:red-AKred transition">Nike</a>
          <a href="https://adidas.com" target="_blank" rel="noopener noreferrer" className="font-poppins text-gray-300 hover:red-AKred transition">Adidas</a>
          <a href="https://puma.com" target="_blank" rel="noopener noreferrer" className="font-poppins text-gray-300 hover:red-AKred transition">Puma</a>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-10 border-t border-gray-800 pt-8 text-center">
        <p className="text-gray-400 font-poppins text-sm mb-2">
          AkKStore is committed to providing luxury fashion and exceptional service. Our curated collections are sourced from trusted partners and designed to elevate your style.
        </p>
        <p className="text-gray-400 font-poppins text-xs mb-2">
          All product images, logos, and brand names are trademarks of their respective owners. AKStore is an independent retailer and is not affiliated with the brands listed above unless explicitly stated.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-4">
          <Link to="/terms" className="text-gray-400 hover:red-AKred font-poppins text-xs">Terms of Service</Link>
          <span className="hidden md:inline-block text-gray-600">|</span>
          <Link to="/privacy" className="text-gray-400 hover:red-AKred font-poppins text-xs">Privacy Policy</Link>
          <span className="hidden md:inline-block text-gray-600">|</span>
          <Link to="/cookies" className="text-gray-400 hover:red-AKred font-poppins text-xs">Cookie Policy</Link>
        </div>
        <p className="text-gray-500 font-poppins text-xs mt-6">© {new Date().getFullYear()} A&K Store. All rights reserved.</p>
      </div>
    </footer>
  );
}

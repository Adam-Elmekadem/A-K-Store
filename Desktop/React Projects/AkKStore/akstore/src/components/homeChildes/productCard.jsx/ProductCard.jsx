import React from 'react';

export default function ProductCard({ image, name, description, price, onAddToCart }) {

  return (
    <div className="bg-white shadow-lg overflow-hidden hover:border hover:border-red-600 transition-shadow duration-300 group">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-gray-900 font-poppins">{name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-black">${price}</span>
          <button 
            onClick={onAddToCart}
            className="px-6 py-3 bg-red-AKred text-white font-bold shadow  transition-colors duration-300 hover:cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';

export default function ServiceCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-gray-900 rounded-lg p-8 flex flex-col items-center shadow-lg">
      <Icon size={40} className="text-red-AKred mb-4" />
      <h4 className="text-xl font-bold mb-2 text-white">{title}</h4>
      <p className="text-gray-400 text-center font-poppins">{description}</p>
    </div>
  );
}
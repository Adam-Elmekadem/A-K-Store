import React from 'react';

export default function PartnerCard({ img, alt, name, description, comment }) {
  return (
    <div className="flex flex-col items-center bg-white shadow p-6">
      <div className="w-24 h-24 flex items-center justify-center mb-2">
        <img src={img} alt={alt} />
      </div>
      <span className="font-bold text-black font-poppins text-2xl mb-2">{name}</span>
      <p className="text-gray-700 font-poppins mb-2 text-sm">{description}</p>
      <blockquote className="italic text-gray-500 font-poppins text-xs">{comment}</blockquote>
    </div>
  );
}

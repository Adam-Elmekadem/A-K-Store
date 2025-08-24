import React from 'react';
import { Star, Smile } from 'lucide-react';

export default function FeedbackCard({ name, feedback }) {
  return (
    <div className="p-8 flex flex-col items-center">
      <Smile size={40} className="red-AKred mb-4" />
      <p className="text-gray-300 text-center font-poppins mb-2">{feedback}</p>
      <div className="flex gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={18} className="text-yellow-400" />
        ))}
      </div>
      <span className="text-gray-400 font-poppins">- {name}</span>
    </div>
  );
}
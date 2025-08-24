import React from 'react';

export default function ImageCard({src, alt, imgClass, className, children}) {
  return (
    <div className="image-card relative w-full h-full flex items-center justify-center">
      <img src={src} alt={alt} className={imgClass + ' w-full h-full object-cover rounded-xl'} />
      <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 pointer-events-none"></div>
      <button className={className}>
        {children}
      </button>
    </div>
  );
}

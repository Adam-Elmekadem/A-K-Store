import React from 'react';
import { Link } from 'react-router-dom';

import ImageCard from './HeroImage';

//images
import Hero1 from '../../assets/images/HeroImages/Hero1.png';
import Hero2 from '../../assets/images/HeroImages/Hero2.png';

const images = [
                { src: Hero1, alt: 'image for hero section' },
                { src: Hero2, alt: 'another image for hero section' }
            ];

const imageMap = images.map((image, index) => (
          <ImageCard
            key={index}
            src={image.src}
            alt={image.alt}
            className="absolute border-2 border-black bottom-70 left-1/2 -translate-x-1/2 px-12 py-6 bg-white text-black text-lg font-light hover:font-semibold hover:cursor-pointer z-20 font-poppins" 
          >
            {index === 0 ? (
              <Link to="/shop" className="block w-full h-full">
                START SHOPPING
              </Link>
            ) : (
              <Link to="/about" className="block w-full h-full">
                EXPLORE MORE
              </Link>
            )}
  </ImageCard>
))

export default function HeroSection() {
  return (
    <section className="bg-black relative w-full h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="flex items-center justify-center w-full h-screen gap-8">
        {/* Desktop: show both images */}
        <div className="hidden md:flex w-full h-full gap-8 items-center justify-center">
          {imageMap}
        </div>
        <div className="flex flex-col md:hidden w-full h-full items-center justify-center">
          <div className="w-full max-w-2xl flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-3xl font-bold mb-6 text-white font-Guardian bg-opacity-80 py-4 px-2 shadow-lg">
              Welcome to AkKStore
            </h1>
            <p className="text-lg text-gray-100 font-poppins mb-4 py-2 px-2 shadow">
              Discover luxury tech and fashion products. Find your style and shop the latest collections!
            </p>
            <div className="flex flex-col gap-4 w-full">
              <Link to="/shop">
                <button className="w-full border-2 border-black px-8 py-4 bg-white text-black text-lg font-light hover:font-semibold hover:cursor-pointer z-20 font-poppins shadow">
                  SHOP NOW
                </button>
              </Link>
              <Link to="/about">
                <button className="w-full border-2 border-black px-8 py-4 bg-white text-black text-lg font-light hover:font-semibold hover:cursor-pointer z-20 font-poppins shadow">
                  EXPLORE MORE
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
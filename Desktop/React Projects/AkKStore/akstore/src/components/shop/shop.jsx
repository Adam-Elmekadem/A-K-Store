import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';

export default function Shop() {
  return (
    <>
      <Navbar />
      <section className="bg-black text-white min-h-screen flex flex-col justify-center items-center py-24 px-4">
        <div className="max-w-xl text-center">
          <h1 className="text-4xl font-bold mb-6 text-red-AKred font-Guardian">Shop</h1>
          <p className="text-lg text-gray-300 font-poppins mb-4">
            Our website is still in development.<br />
            The shop section will be available soon!
          </p>
          <span className="text-gray-400 font-poppins text-sm">
            Stay tuned for updates and new products.
          </span>
        </div>
      </section>
      <Footer />
    </>
  );
}
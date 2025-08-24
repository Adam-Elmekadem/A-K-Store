import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';

export default function Contact() {
  return (
    <>
      <Navbar />
      <section className="bg-black text-white min-h-screen flex flex-col justify-center items-center py-24 px-4">
        <div className="max-w-xl w-full text-center">
          <h1 className="text-4xl font-bold mb-6 text-red-AKred font-Guardian">Contact Us</h1>
          <p className="text-lg text-gray-300 font-poppins mb-4">
            Have questions or need support? Reach out to us!
          </p>
          <div className="flex flex-col gap-4 items-center mb-8">
            <div>
              <span className="font-bold text-white">Email:</span>{' '}
              <a href="mailto:contact@akstore.com" className="text-red-AKred hover:underline">contact@akstore.com</a>
            </div>
            <div>
              <span className="font-bold text-white">Phone:</span>{' '}
              <a href="tel:+212618981078" className="text-red-AKred hover:underline">+212 6 18 98 10 78</a>
            </div>
            <div>
              <span className="font-bold text-white">Location:</span>{' '}
              Av. Mohamed Taib Al Alaoui, Salé, Morocco
            </div>
          </div>
          <form className="flex flex-col gap-4 items-center">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-6 py-3 border border-white bg-black text-white font-poppins focus:outline-none focus:ring-2 focus:ring-red-AKred"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-6 py-3 border border-white bg-black text-white font-poppins focus:outline-none focus:ring-2 focus:ring-red-AKred"
              required
            />
            <textarea
              placeholder="Your Message"
              className="w-full px-6 py-3 border border-white bg-black text-white font-poppins focus:outline-none focus:ring-2 focus:ring-red-AKred"
              rows={5}
              required
            />
            <button
              type="submit"
              className="px-8 py-3 border-2 text-white font-bold shadow hover:bg-red-600 hover:text-whiite hover:cursor-pointer transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}
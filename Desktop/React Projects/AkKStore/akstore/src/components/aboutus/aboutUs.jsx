import React from 'react';
import { Star, ShoppingCart, ShieldCheck, Truck, Smile } from 'lucide-react';
import { Link } from 'react-router-dom';

import aboutImg from '../..//assets/images/aboutUsImags/aboutus.jpeg';
import Navbar from '../Navbar';
import Footer from '../Footer';
import LocationMap from './LocationMap';
import TeamCard from './TeamCard';

// Array
const services = [
  {
    icon: ShoppingCart,
    title: 'Wide Selection',
    description: 'Choose from the latest laptops, phones, and accessories.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Shopping',
    description: 'Your data and payments are protected with us.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Get your products quickly and reliably, every time.',
  },
];

// Array
const feedbacks = [
  {
    name: 'Sarah K.',
    feedback: 'Amazing service and fast delivery. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Ahmed Z.',
    feedback: 'Great selection and secure checkout. Will shop again!',
    rating: 4,
  },
  {
    name: 'Lina M.',
    feedback: 'Support team was very helpful. 5 stars!',
    rating: 5,
  },
];

// Team
const team = [
  {
    name: "Adam Elmekadem",
    role: "Frontend developer & UI/UX Designer",
    github: "https://github.com/Adam-Elmekadem",
    linkedin: "https://www.linkedin.com/in/adam-elmekadem-9a638231a/"
  },
  {
    name: "Zakaria Harouach",
    role: "Backend Developer",
    github: "https://github.com/ZakariaHarouach",
    linkedin: "https://www.linkedin.com/in/zakaria-harouach-824b2335b/"
  },
];

export default function AboutUs() {
  return (
    <>
      <Navbar />
      <section className="bg-black text-white min-h-screen py-16 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 mb-16">
          <img
            src={aboutImg}
            alt="About Us"
            className="w-full h-screen md:w-1/2 object-cover border-4 border-red-AKred"
          />
          <div className="md:w-1/2 mb-20 sm:mb-0">
            <h2 className="text-4xl font-bold mb-6 text-red-AKred font-Guardian">About Us</h2>
            <p className="text-lg text-gray-300 font-poppins mb-4">
              Welcome to <span className="red-AKred">AKStore!</span> We are passionate about delivering the best tech products and customer experience.
              Our team is dedicated to quality, reliability, and innovation. Thank you for choosing us!
            </p>
            <p className="text-md text-gray-400 font-poppins">
              Our mission is to make technology accessible, affordable, and enjoyable for everyone.
              We believe in providing top-notch products and services that enhance your digital lifestyle.
            </p>
            <Link to="/shop">
              <button className="mt-4 border-2 border-black bottom-70 px-12 py-6 bg-white text-black text-lg font-light hover:font-semibold hover:cursor-pointer z-20 font-poppins">
                StTART SHOPPING
              </button>
            </Link>
          </div>
        </div>

        {/* Services Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <h3 className="text-3xl font-bold mb-8 text-center text-white font-Guardian">Our Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div key={service.title} className="p-8 flex flex-col items-center shadow-lg">
                <service.icon size={40} className="red-AKred mb-4" />
                <h4 className="text-xl font-bold mb-2 text-white">{service.title}</h4>
                <p className="text-gray-400 text-center font-poppins">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <h3 className="text-3xl font-bold mb-8 text-center text-white font-Guardian">Customer Feedback</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {feedbacks.map((fb, idx) => (
              <div key={fb.name} className="p-8 flex flex-col items-center shadow-lg">
                <Smile size={40} className="red-AKred mb-4" />
                <p className="text-gray-300 text-center font-poppins mb-2">
                  "{fb.feedback}"
                </p>
                <div className="flex gap-1 mb-2">
                  {[...Array(fb.rating)].map((_, i) => (
                    <Star key={i} size={18} className="text-yellow-400" />
                  ))}
                  {[...Array(5 - fb.rating)].map((_, i) => (
                    <Star key={i + fb.rating} size={18} className="text-gray-600" />
                  ))}
                </div>
                <span className="text-gray-400 font-poppins">- {fb.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-6xl mx-auto my-16">
          <h3 className="text-3xl font-bold mb-8 text-center text-white font-Guardian">Our Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <TeamCard key={member.name} {...member} />
            ))}
          </div>
        </div>
      </section>
      <LocationMap />
      <Footer />
    </>
  );
}
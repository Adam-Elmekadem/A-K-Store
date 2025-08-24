import React from 'react';

import PartnerCard from './partnerCard/PartnerCard';

//imgs 
import nike from '../../assets/images/partners/nike.png';
import adidas from '../../assets/images/partners/adidas.png';
import puma from '../../assets/images/partners/puma.png';

const partners = [
  {
    img: nike,
    alt: "Nike Logo",
    name: "Nike",
    description: "Nike is a global leader in athletic footwear and apparel, inspiring athletes worldwide.",
    comment: "“Partnering with AkKStore brings our vision to a new audience.”"
  },
  {
    img: adidas,
    alt: "Adidas Logo",
    name: "Adidas",
    description: "Adidas is a multinational corporation that designs and manufactures shoes, clothing, and accessories.",
    comment: "“We believe in the power of sport to change lives.”"
  },
  {
    img: puma,
    alt: "Puma Logo",
    name: "Puma",
    description: "Puma is a German multinational corporation that designs and manufactures athletic and casual footwear, apparel, and accessories.",
    comment: "“Our partnership with AkKStore is a game-changer for both brands.”"
  }
]

export default function LuxuryStayInTouch() {
  return (
    <section className="bg-black text-white py-12 px-4 mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-4 font-Guardian text-white">
          Our Partners
        </h1>
      </div>

      <div className="my-16 w-full flex items-center justify-center">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-0">
          {partners.map((partner, idx) => (
            <React.Fragment key={partner.name}>
              <PartnerCard {...partner} />

                <div className={`hidden md:flex ${idx === 0 || idx === 2 ? 'px-4' : ""} items-center justify-center`}>
                  <p className="text-gray-500 font-poppins text-xs">{
                      idx === 0 ? "Nike is one of our flagship partners, known for their innovative designs and commitment to sustainability. It's a partnership built on shared values and a vision for the future." : 
                      idx === 1 ? "Adidas is a key player in the sportswear industry, blending performance with style. Their commitment to sustainability aligns perfectly with our brand ethos." : 
                      "Puma is renowned for its bold designs and dedication to sustainability. It's a partnership that pushes boundaries and embraces creativity."}</p>
                </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 font-Guardian drop-shadow-lg red-AKred">
        Stay In Touch
      </h2>
      <p className="text-center text-lg md:text-xl text-gray-200 mb-6 poppins-light">
        Join our exclusive club for early access to new collections, luxury offers, and curated style inspiration. Stay connected and elevate your wardrobe with the finest from AkKStore.
      </p>
      <form className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
        <input
          type="email"
          placeholder="Your email address"
          className="px-6 py-3 border border-red-AKred focus:outline-none focus:ring-2 focus:ring-red-AKred w-full md:w-2/3 text-lg font-poppins bg-black text-white"
        />
        <button
          type="submit"
          className="px-8 py-3 bg-red-AKred hover:border hover:border-white text-white font-bold shadow hover:bg-black  hover:text-red-AKred transition-colors duration-300 text-lg font-poppins"
        >
          Stay In Touch
        </button>
      </form>
    </section>
  );
}

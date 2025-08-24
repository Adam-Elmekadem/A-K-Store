import React from 'react';


import Navbar from './Navbar.jsx';
import HeroSection from './homeChildes/HeroSection.jsx';
import NewCollection from './homeChildes/NewCollection.jsx';
import LuxuryStayInTouch from './homeChildes/LuxuryStayInTouch.jsx';
import Footer from './Footer.jsx';

export default function Home() {
    return (
        <>
            <Navbar />
            <HeroSection />
            <NewCollection />
            <LuxuryStayInTouch />
            <Footer />
        </>
    )
}
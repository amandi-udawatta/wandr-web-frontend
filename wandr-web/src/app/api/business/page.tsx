// pages/blog/index.tsx
import React from 'react';
import Navbar from '@/components/general/Navbar';
import Footer from '@/components/general/Footer';
import BusinessHero from '@/components/general/Business/BusinessHero';

const BusinessPage = () => {
  return (
    <div>
      <Navbar/>
      <BusinessHero/>
      <Footer/>
    </div>
  );
};

export default BusinessPage;

// pages/blog/index.tsx
import React from 'react';
import Navbar from '@/components/general/Navbar';
import Footer from '@/components/general/Footer';
import BusinessHero from '@/components/general/Business/BusinessHero';
import BusinessPlans from '@/components/general/Business/BusinessPlans';

const BusinessPage = () => {
  return (
    <div>
      <Navbar/>
      <BusinessHero/>
      <BusinessPlans/>
      <Footer/>
    </div>
  );
};

export default BusinessPage;

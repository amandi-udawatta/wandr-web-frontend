// pages/blog/index.tsx
import React from 'react';
import Navbar from '@/components/general/Navbar';
import Footer from '@/components/general/Footer';
import BusinessHero from '@/components/general/Business/BusinessHero';
import BusinessPlans from '@/components/general/Business/BusinessPlans';
import Testimonials from '@/components/general/Business/BusinessTestimonials';

const BusinessPage = () => {
  return (
    <div>
      <Navbar/>
      <BusinessHero/>
      <Testimonials/>
      <BusinessPlans/>
      <Footer/>
    </div>
  );
};

export default BusinessPage;

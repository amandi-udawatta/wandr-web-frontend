// components/CountryShowcase.tsx
import React from 'react';
import { Button, Col, Row } from 'antd';
import Image from 'next/image';

const BlogStatsCarousel = () => {
  return (
    <Row className=' max-container padding-container
    flex flex-col gap-20 py-5 md:gap-28 lg:pb-5 lg:mt-32 xl:flex-row'>
      <Col className=' w-[50%] hidden lg:flex'>
        <div className="relative group">
          <div className="absolute w-60 h-[300px] bg-cover bg-center 
            z-10 mt-[50px] shadow-lg shadow-slate-500 rounded-xl 
              hover:z-50 hover:scale-105 hover:shadow-2xl transition-all duration-700 ease-in-out
              " style={{ backgroundImage: 'url(/awesomePic3.jpg)' }}>
          </div>
          <div className="absolute w-80 h-[400px] bg-cover bg-center ml-32 
            z-30 shadow-lg shadow-slate-500 rounded-xl 
              hover:z-50 hover:scale-105 hover:shadow-2xl transition-all duration-700 ease-in-out
              " style={{ backgroundImage: 'url(/awesomePic2.jpg)' }}>
          </div>
          <div className="absolute w-80 h-[500px] bg-cover bg-center ml-72 mt-[-40px] 
            z-40 shadow-lg shadow-slate-500 rounded-xl
            hover:z-50 hover:scale-105 hover:shadow-2xl transition-all duration-700 ease-in-out
            " style={{ backgroundImage: 'url(/awesomePic1.jpg)' }}>
          </div>
        </div>
      </Col>
      <Col className='lg:w-[40%] w-[100%]'>
        <div className='flex lg:justify-start align-middle justify-center'>
          <h1 className="text-7xl font-bold mb-6">AWESOME</h1>
          <Image
              src = "/activities/activityTeaPlantationTours.png"
              alt = "camp"
              width = {200}
              height = {200}
              style={{ width: '70px', height: 'auto' }}
              className='absolute left-[380px] lg:w-[50px] hidden lg:flex'
          />
        </div>
        <div className='flex lg:justify-end align-middle justify-center mt-0'>
          <Image
              src = "/activities/activityCulturalTours.png"
              alt = "camp"
              width = {300}
              height = {300}
              style={{ width: '90px', height: 'auto' }}
              className='absolute left-[70px] lg:w-[50px] hidden lg:flex'
          />
          <h1 className="text-7xl font-bold mb-6 text-green-50">COUNTRY</h1>
        </div>
        <div className="flex justify-around w-full my-12">
          <div className="text-center">
            <h2 className="text-4xl font-serif font-medium">1.2K+</h2>
            <p className='font-medium'>Mountains</p>
          </div>
          <div className="text-center">
            <h2 className="text-4xl font-serif font-medium">8</h2>
            <p className='font-medium'>UNESCO Heritages</p>
          </div>
          <div className="text-center">
            <h2 className="text-4xl font-serif font-medium">14K+</h2>
            <p className='font-medium'>Tanks</p>
          </div>
          
        </div>
        <p className='regular-16 mt-6 text-gray-30 xl:max-w-[520px] text-center'>
          Discover Sri Lanka's wonders: majestic mountains, serene tanks, and UNESCO World Heritage sites. These natural and historical treasures create a breathtaking landscape, offering an unforgettable journey through this island's rich heritage.
        </p>
        
      </Col>
      
    </Row>
  );
};

export default BlogStatsCarousel;
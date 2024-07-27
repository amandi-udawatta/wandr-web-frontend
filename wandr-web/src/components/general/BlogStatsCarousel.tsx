// components/CountryShowcase.tsx
import React from 'react';
import { Button } from 'antd';

const BlogStatsCarousel = () => {
  return (
    <div className="flex flex-col items-center p-10 bg-white">
      <h1 className="text-4xl font-bold mb-6">AWESOME COUNTRY</h1>
      <div className="flex justify-around w-full mb-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold">3K+</h2>
          <p>castles</p>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold">31K+</h2>
          <p>lakes</p>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold">700+</h2>
          <p>islands</p>
        </div>
      </div>
      {/* <div className="relative flex justify-center items-center">
        <div className="absolute w-64 h-96 bg-cover bg-center" style={{ backgroundImage: 'url(/sigiriya.png)' }}></div>
        <div className="absolute w-64 h-96 bg-cover bg-center left-20" style={{ backgroundImage: 'url(/sigiriya.png)' }}></div>
        <div className="absolute w-64 h-96 bg-cover bg-center left-40" style={{ backgroundImage: 'url(/sigiriya.png)' }}></div>
      </div> */}
      <Button type="primary" className="mt-8">READ MORE</Button>
    </div>
  );
};

export default BlogStatsCarousel;
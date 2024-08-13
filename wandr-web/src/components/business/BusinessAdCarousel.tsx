import React from 'react';
import { Carousel } from 'antd';

type Advertisement = {
  image: string;
  title: string;
  remainingDays: number;
};

type AdvertisementCarouselProps = {
  advertisements: Advertisement[];
};

const AdvertisementCarousel: React.FC<AdvertisementCarouselProps> = ({ advertisements }) => {
  return (
    <div className="border border-gray-200 rounded-xl p-5 ">
      <h2 className="text-xl font-bold h-full mb-3 mt-3">Ongoing Advertisements</h2>
      <Carousel autoplay className='w-80 h-auto'>
        {advertisements.map((ad, index) => (
          <div key={index} className="flex flex-col items-center">
            <img src={ad.image} alt={ad.title} className="w-full h-80 object-cover rounded-md" />
            <div className="mt-4 flex justify-between items-center mb-5">
              <h3 className="text-md font-semibold">{ad.title}</h3>
              <p className="text-gray-500 mb-0">Remaining Days: {ad.remainingDays}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default AdvertisementCarousel;

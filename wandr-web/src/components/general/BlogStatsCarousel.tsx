// src/components/StatisticsCarousel.tsx
'use client'

import React, { useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import { TeamOutlined, FileTextOutlined, EnvironmentOutlined, AppstoreAddOutlined } from '@ant-design/icons';// Ensure Ant Design styles are included

// Define statistics and image data
const statsData = [
  { title: 'Total Blogs', icon: <FileTextOutlined />, number: 1234 },
  { title: 'Total Users', icon: <TeamOutlined />, number: 5678 },
  { title: 'Total Places', icon: <EnvironmentOutlined />, number: 910 },
  { title: 'Total Products', icon: <AppstoreAddOutlined />, number: 112 },
];

const imagesData = [
  '/sigiriya.png',
  '/nilaweli.png',
  '/sigiriya.png',
  '/nilaweli.png',
];

const BlogStatsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (statsData.length + imagesData.length));
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="overflow-hidden relative">
      <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {/* Render statistics */}
        {statsData.map((stat, index) => (
          <div
            key={`stat-${index}`}
            className="w-64 h-40 flex-shrink-0 bg-white rounded-lg shadow-lg p-4 m-2 flex items-center space-x-4 hover:bg-gray-100 transition ease-in-out"
          >
            <Tooltip title={stat.title} placement="top">
              <div className="text-2xl">{stat.icon}</div>
            </Tooltip>
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{stat.title}</h3>
              <p className="text-2xl font-bold">{stat.number}</p>
            </div>
          </div>
        ))}

        {/* Render images */}
        {imagesData.map((image, index) => (
          <div
            key={`image-${index}`}
            className="w-64 h-40 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden m-2 flex items-center justify-center"
          >
            <img src={image} alt={`Carousel ${index}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-between">
        <button
          onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + (statsData.length + imagesData.length)) % (statsData.length + imagesData.length))}
          className="bg-gray-200 p-2 rounded-full"
        >
          &lt;
        </button>
        <button
          onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % (statsData.length + imagesData.length))}
          className="bg-gray-200 p-2 rounded-full"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default BlogStatsCarousel;

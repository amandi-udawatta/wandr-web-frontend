// src/components/RecentBlogs.tsx
'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { Avatar, Tag } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import Button from '@/components/general/Button';
import Chip from '../Chip';

interface Blog {
  id: number;
  title: string;
  image: string;
  authorImage: string;
  authorName: string;
  views: number;
  description: string;
  categories: string[];  // Change to an array of strings
}

const blogs: Blog[] = [
  {
    id: 1,
    title: 'Alone with nature',
    image: '/awesomePic1.jpg',
    authorImage: '/person-1.png',
    authorName: 'John Doe',
    views: 100,
    description: 'Experience the serene beauty of nature...',
    categories: ['Temple', 'National Park'],
  },
  {
    id: 2,
    title: 'Jeep ride',
    image: '/awesomePic2.jpg',
    authorImage: '/person-2.png',
    authorName: 'Jane Smith',
    views: 200,
    description: 'An adventurous ride through the mountains...',
    categories: ['Waterfall'],
  },
  {
    id: 3,
    title: 'Hiking tour',
    image: '/awesomePic3.jpg',
    authorImage: '/person-3.png',
    authorName: 'Mike Johnson',
    views: 150,
    description: 'Explore the best hiking trails...',
    categories: ['Monument', 'Mountain'],
  },
  {
    id: 4,
    title: 'Corners of the island',
    image: '/awesomePic1.jpg',
    authorImage: '/person-4.png',
    authorName: 'Emily Davis',
    views: 220,
    description: 'Discover the hidden gems of the island...',
    categories: ['Beach'],
  },
];

const CATEGORY_IMAGES = [
    { category: 'All'},
    { category: 'Mountain', image: '/categories/categoryMountain.png' },
    { category: 'Beach', image: '/categories/categoryBeach.png' },
    { category: 'National Park', image: '/categories/categoryNationalPark.png' },
    { category: 'Historic Site', image: '/categories/categoryHistoricSite.png' },
    { category: 'Museum', image: '/categories/categoryMuseum.png' },
    { category: 'Art Gallery', image: '/categories/categoryArtGallery.png' },
    { category: 'Temple', image: '/categories/categoryTemple.png' },
    { category: 'Church', image: '/categories/categoryChurch.png' },
    { category: 'Monument', image: '/categories/categoryMonument.png' },
    { category: 'Museum', image: '/categories/categoryMuseum.png' },
    { category: 'Art Gallery', image: '/categories/categoryArtGallery.png' },
    { category: 'Temple', image: '/categories/categoryTemple.png' },
    { category: 'Church', image: '/categories/categoryChurch.png' },
    { category: 'Monument', image: '/categories/categoryMonument.png' },
];


const FilterByCategory: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredBlogs = selectedCategory === 'All'
    ? blogs
    : blogs.filter(blog => blog.categories.includes(selectedCategory));

  return (
    <section className="max-container padding-container gap-20 md:gap-28 lg:pb-20 lg:my-10 lg:mt-40">
      <Image
        src="/activities/activityPhotography.png"
        alt="camp"
        width={100}
        height={100}
        style={{ width: '85px', height: 'auto' }}
        className='absolute left-[1000px] mt-[-30px] lg:w-[50px] hidden lg:flex'
      />
      <h2 className="text-5xl font-semibold mb-6 text-center">Filter By Category</h2>
      <p className="text-md text-gray-30 mb-12 text-center">Select a category to explore blogs tailored to your interests and discover insightful stories from our diverse community.</p>
      
      <div className="w-full overflow-x-auto hide-scrollbar">
        <div className="flex justify-start items-center space-x-4 p-4">
          {CATEGORY_IMAGES.map((category) => (
            <Tag
              key={category.category}
              color={selectedCategory === category.category ? 'blue' : 'default'}
              onClick={() => setSelectedCategory(category.category)}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              className="border border-gray-200 rounded-xl"
            >
              {category.image && (
                <Avatar
                  src={category.image}
                  alt={category.category}
                  size="large"
                  style={{ marginRight: 8 }}
                  className="p-1"
                />
              )}
              <span style={{ fontSize: '12px' }}>{category.category}</span>
            </Tag>
          ))}
        </div>
      </div>


        
      {filteredBlogs.length === 0 ? (
        <div className="flex flex-col text-center text-gray-500 min-h-[100px] justify-center align-middle">
            <p>No blogs found for this category :(</p>
            <br />
            <p>But you can always keep searching!</p>
        </div>
      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 hover:cursor-pointer">
            {filteredBlogs.map((blog) => (
            <div key={blog.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <Image src={blog.image} alt={blog.title} width={400} height={300} className="w-full h-48 object-cover" />
                <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                <div className='flex flex-row justify-between align-middle'>
                    <div className="flex items-center mb-2">
                    <Avatar src={blog.authorImage} alt={blog.authorName} />
                    <span className="ml-2 text-gray-600">{blog.authorName}</span>
                    </div>
                    <div className="flex items-center mb-2">
                    <EyeOutlined className="mr-1" />
                    <span>{blog.views}</span>
                    </div>
                </div>
                <p className="text-gray-700">{blog.description.split(' ').slice(0, 10).join(' ')}...</p>
                </div>
            </div>
            ))}
        </div>
      )}

     <div className='flex justify-center mt-6'>
        <Button
          type="submit"
          title="See All"
          variant="btn_white_border"
          height="h-btn-sm"
          rounded="rounded-lg"
        />
      </div>
    </section>
  );
};

export default FilterByCategory;

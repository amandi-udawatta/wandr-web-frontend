// src/components/RecentBlogs.tsx

import React from 'react';
import Image from 'next/image';
import { Avatar } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import Button from '../Button';

interface Blog {
  id: number;
  title: string;
  image: string;
  authorImage: string;
  authorName: string;
  views: number;
  description: string;
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
  },
  {
    id: 2,
    title: 'Jeep ride',
    image: '/awesomePic2.jpg',
    authorImage: '/person-2.png',
    authorName: 'Jane Smith',
    views: 200,
    description: 'An adventurous ride through the mountains...',
  },
  {
    id: 3,
    title: 'Hiking tour',
    image: '/awesomePic3.jpg',
    authorImage: '/person-3.png',
    authorName: 'Mike Johnson',
    views: 150,
    description: 'Explore the best hiking trails...',
  },
  {
    id: 4,
    title: 'Corners of the island',
    image: '/awesomePic1.jpg',
    authorImage: '/person-4.png',
    authorName: 'Emily Davis',
    views: 220,
    description: 'Discover the hidden gems of the island...',
  },
];

const RecentBlogs: React.FC = () => {
  return (
    <section className="max-container padding-container gap-20 md:gap-28 lg:pb-20 my-10 lg:my-0">
        <Image
            src = "/activities/activityKayaking.png"
            alt = "camp"
            width = {100}
            height = {100}
            style={{ width: '85px', height: 'auto' }}
            className='absolute left-[500px] mt-[-20px] lg:w-[50px] hidden lg:flex'
        />
      <h2 className="text-5xl font-semibold mb-6 text-center">Recent Blogs</h2>
      <p className="text-md text-gray-30 mb-12 text-center">Explore the latest blog posts from our community. Stay updated with exciting stories, tips, and insights from our diverse group of authors.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 hover:cursor-pointer">
        {blogs.map((blog) => (
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

export default RecentBlogs;

// pages/blog/index.tsx
import React from 'react';
import BlogPost from './blogPost/page';
import { Button } from 'antd'; // Assuming this is where your BlogPost component is located
import Navbar from '@/components/general/Navbar';
import Footer from '@/components/general/Footer';
import {BlogHero} from '@/components/general/Blogs/BlogHero';
import BlogStatsCarousel from '@/components/general/Blogs/BlogStatsCarousel';
import RecentBlogs from '@/components/general/Blogs/RecentBlogs';
import FilterByCategory from '@/components/general/Blogs/FilterByCategory';

const BlogPage = () => {
  return (
    <div>
      <Navbar/>
      <BlogHero/>
      <RecentBlogs/>
      <BlogStatsCarousel/>
      <FilterByCategory/>
      {/* <BlogPost
        title="My First Blog Post"
        author="John Doe"
        date="January 1, 2022"
        content="<p>This is my first blog post. Welcome!</p>"
      /> */}
      {/* <Button type="primary">Button</Button> */}
      <Footer/>
    </div>
  );
};

export default BlogPage;

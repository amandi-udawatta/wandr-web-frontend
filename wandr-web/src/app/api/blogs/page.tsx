// pages/blog/index.tsx
import React from 'react';
import BlogPost from './blogPost/page'; // Assuming this is where your BlogPost component is located

const BlogPage = () => {
  return (
    <div>
      <h1>Blog</h1>
      <BlogPost
        title="My First Blog Post"
        author="John Doe"
        date="January 1, 2022"
        content="<p>This is my first blog post. Welcome!</p>"
      />
    </div>
  );
};

export default BlogPage;

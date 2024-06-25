// components/BlogPost.tsx
import React from 'react';

// This is a simple component that displays a blog post

interface BlogPostProps {
  title: string;
  author: string;
  date: string;
  content: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ title, author, date, content }) => {
  return (
    <article className="blog-post">
      <h2>{title}</h2>
      <p>By {author} on {date}</p>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
};

export default BlogPost;

'use client';

import { useState, useEffect } from 'react';
import { Blog } from '@/lib/types';
import { getBlogStorage, addBlog, updateBlog, deleteBlog } from '@/lib/mockData';

export function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    setBlogs(getBlogStorage());
  }, []);

  const createBlog = (blog: Blog) => {
    addBlog(blog);
    setBlogs([...getBlogStorage()]);
  };

  const editBlog = (id: string, updates: Partial<Blog>) => {
    updateBlog(id, updates);
    setBlogs([...getBlogStorage()]);
  };

  const removeBlog = (id: string) => {
    deleteBlog(id);
    setBlogs([...getBlogStorage()]);
  };

  return { blogs, createBlog, editBlog, removeBlog };
}

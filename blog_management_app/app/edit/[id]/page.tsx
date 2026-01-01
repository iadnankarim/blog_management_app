'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useBlogs } from '@/hooks/useBlogs';
import BlogForm from '@/components/blog/BlogForm';

export default function EditBlogPage() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const { blogs } = useBlogs();
  const router = useRouter();
  const params = useParams();

  const blog = blogs.find(b => b.id === params.id);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (blog && user && blog.authorId !== user.id) {
      router.push('/blogs');
    }
  }, [blog, user, router]);

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated || !blog) {
    return null;
  }

  if (blog.authorId !== user?.id) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-24 py-12 md:py-16 lg:py-20">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-8 md:mb-12">Edit Post</h1>
        <BlogForm mode="edit" blog={blog} />
      </div>
    </div>
  );
}

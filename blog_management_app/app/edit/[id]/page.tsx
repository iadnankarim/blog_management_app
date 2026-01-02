'use client';

import { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useGetPostByIdQuery } from '@/lib/redux/hooks/useBlogQueries';
import BlogForm from '@/components/blog/BlogForm';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorAlert from '@/components/ui/ErrorAlert';

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const { data: blog, isLoading: blogLoading, isError, error } = useGetPostByIdQuery(id);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (blog && user && blog.authorId !== user.id) {
      router.push('/blogs');
    }
  }, [blog, user, router]);

  if (authLoading || blogLoading) {
    return (
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <LoadingSpinner className="min-h-screen" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (isError || !blog) {
    return (
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-24 py-12">
          <ErrorAlert message={error?.message || 'Blog post not found'} />
        </div>
      </div>
    );
  }

  if (blog.authorId !== user?.id) {
    return (
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-24 py-12">
          <ErrorAlert message="You don't have permission to edit this post" />
        </div>
      </div>
    );
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

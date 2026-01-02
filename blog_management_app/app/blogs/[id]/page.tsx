'use client';

import { use } from 'react';
import BlogDetail from '@/components/blog/BlogDetail';
import { useGetPostByIdQuery } from '@/lib/redux/hooks/useBlogQueries';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorAlert from '@/components/ui/ErrorAlert';

export default function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: blog, isLoading, isError } = useGetPostByIdQuery(id);

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <LoadingSpinner className="min-h-screen" />
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <ErrorAlert message="Post not found" className="max-w-2xl mx-auto" />
        </div>
      </div>
    );
  }

  return <BlogDetail blog={blog} />;
}

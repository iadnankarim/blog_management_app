'use client';

import { useParams } from 'next/navigation';
import BlogDetail from '@/components/blog/BlogDetail';
import { useBlogs } from '@/hooks/useBlogs';

export default function BlogDetailPage() {
  const params = useParams();
  const { blogs } = useBlogs();
  const blog = blogs.find(b => b.id === params.id);

  if (!blog) {
    return (
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Blog Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400">The blog post you&apos;re looking for doesn&apos;t exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return <BlogDetail blog={blog} />;
}

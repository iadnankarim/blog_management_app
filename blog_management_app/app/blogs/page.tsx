'use client';

import BlogList from '@/components/blog/BlogList';
import { useBlogs } from '@/hooks/useBlogs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function BlogsPage() {
  const { blogs } = useBlogs();
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-24 py-12 md:py-16 lg:py-20">
        <div className="flex justify-between items-center mb-10 md:mb-16 max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100">All Posts</h1>
          {isAuthenticated && (
            <Link href="/create">
              <Button className="bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 px-4 md:px-6 py-2 md:py-2.5 text-sm md:text-[15px] font-medium rounded-lg">
                <span className="hidden sm:inline">New Post</span>
                <span className="sm:hidden">New</span>
              </Button>
            </Link>
          )}
        </div>
        <BlogList blogs={blogs} />
      </div>
    </div>
  );
}

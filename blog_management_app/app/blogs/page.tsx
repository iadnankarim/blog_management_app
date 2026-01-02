'use client';

import { useState } from 'react';
import BlogList from '@/components/blog/BlogList';
import { useGetPostsQuery } from '@/lib/redux/hooks/useBlogQueries';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorAlert from '@/components/ui/ErrorAlert';

const CATEGORIES = [
  { id: '', label: 'All', emoji: '' },
  { id: 'technology', label: 'Technology', emoji: '💻' },
  { id: 'health', label: 'Health', emoji: '🥕' },
  { id: 'business', label: 'Business', emoji: '💰' },
  { id: 'lifestyle', label: 'Lifestyle', emoji: '🎨' },
  { id: 'travel', label: 'Travel', emoji: '✈️' },
  { id: 'food', label: 'Food', emoji: '🍔' },
  { id: 'sports', label: 'Sports', emoji: '⚽' },
  { id: 'education', label: 'Education', emoji: '📚' },
];

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const { data: blogs = [], isLoading, isError, error } = useGetPostsQuery({
    search: searchTerm,
    tag: selectedCategory,
  });
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-24 py-8 md:py-10 lg:py-12">
        <div className="flex justify-between items-center mb-6 md:mb-8 max-w-6xl mx-auto">
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

        {/* Search Bar */}
        <div className="max-w-6xl mx-auto mb-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" viewBox="0 0 40 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.8571 0C18.7975 0 22.5765 1.5653 25.3627 4.35156C28.149 7.13781 29.7143 10.9168 29.7143 14.8571C29.7143 18.5371 28.3657 21.92 26.1486 24.5257L26.7657 25.1429H28.5714L40 36.5714L36.5714 40L25.1429 28.5714V26.7657L24.5257 26.1486C21.92 28.3657 18.5371 29.7143 14.8571 29.7143C10.9168 29.7143 7.13781 28.149 4.35156 25.3627C1.5653 22.5765 0 18.7975 0 14.8571C0 10.9168 1.5653 7.13781 4.35156 4.35156C7.13781 1.5653 10.9168 0 14.8571 0ZM14.8571 4.57143C9.14286 4.57143 4.57143 9.14286 4.57143 14.8571C4.57143 20.5714 9.14286 25.1429 14.8571 25.1429C20.5714 25.1429 25.1429 20.5714 25.1429 14.8571C25.1429 9.14286 20.5714 4.57143 14.8571 4.57143Z"></path>
              </svg>
            </div>
            <input
              type="search"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100"
            />
          </div>
        </div>

        {/* Category Chips */}
        <div className="max-w-6xl mx-auto mb-6 flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border border-gray-900 dark:border-gray-100'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {category.emoji && <span className="mr-1">{category.emoji}</span>}
              {category.label}
            </button>
          ))}
        </div>

        {/* Blogs Section */}
        {isLoading && <LoadingSpinner className="py-20" />}

        {isError && (
          <ErrorAlert
            message={`Error loading posts: ${error?.message || 'Unknown error'}`}
            className="max-w-6xl mx-auto"
          />
        )}

        {!isLoading && !isError && <BlogList blogs={blogs} />}
      </div>
    </div>
  );
}

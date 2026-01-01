'use client';

import { Blog } from '@/lib/types';
import { useAuth } from '@/hooks/useAuth';
import BlogActions from './BlogActions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface BlogDetailProps {
  blog: Blog;
}

export default function BlogDetail({ blog }: BlogDetailProps) {
  const { user } = useAuth();
  const isOwner = user?.id === blog.authorId;

  return (
    <article className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-24 py-12 md:py-16 lg:py-20">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6 md:mb-8 leading-tight">
          {blog.title}
        </h1>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-8 md:mb-10 pb-8 md:pb-10 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3 md:gap-4">
            <Avatar className="h-12 w-12 md:h-14 md:w-14">
              <AvatarImage src={blog.authorAvatar} alt={blog.authorName} />
              <AvatarFallback className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium">
                {blog.authorName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-gray-900 dark:text-gray-100 text-base">{blog.authorName}</p>
              <p className="text-[15px] text-gray-500 dark:text-gray-400">
                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
          {isOwner && <BlogActions blogId={blog.id} />}
        </div>

        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 md:gap-2.5 mb-8 md:mb-10">
            {blog.tags.map(tag => (
              <span key={tag} className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 px-3 md:px-4 py-1.5 md:py-2 rounded-md font-medium">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div
          className="prose prose-base md:prose-lg lg:prose-xl prose-gray dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </article>
  );
}

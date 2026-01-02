import Link from 'next/link';
import { Blog } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link href={`/blogs/${blog.id}`}>
      <article className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm cursor-pointer h-full flex flex-col">
        <div className="flex-1">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2 leading-snug">
            {blog.title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed">
            {blog.excerpt}
          </p>

          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {blog.tags.slice(0, 2).map(tag => (
                <span key={tag} className="text-xs text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-full font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
          <Avatar className="h-9 w-9 ring-2 ring-gray-100 dark:ring-gray-700">
            <AvatarImage src={blog.authorAvatar} alt={blog.authorName || blog.author || 'Author'} />
            <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-300 text-sm font-semibold">
              {(blog.authorName || blog.author || 'A')[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{blog.authorName || blog.author || 'Anonymous'}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              {new Date(blog.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
}

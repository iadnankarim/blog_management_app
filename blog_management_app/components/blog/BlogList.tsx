import { Blog } from '@/lib/types';
import BlogCard from './BlogCard';

interface BlogListProps {
  blogs: Blog[];
}

export default function BlogList({ blogs }: BlogListProps) {
  if (blogs.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 dark:text-gray-400 text-lg">No blogs found</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {blogs.map(blog => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

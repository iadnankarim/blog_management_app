import { User, Blog } from './types';

// Mock users for authentication
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
  },
];

// Sample blogs
const sampleBlogs: Blog[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js',
    content: '<p>Next.js is a powerful React framework that makes building web applications easier...</p>',
    excerpt: 'Learn the basics of Next.js and how to get started with your first project.',
    author: 'John Doe',
    authorId: '1',
    authorName: 'John Doe',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    tags: ['Next.js', 'React', 'Web Development'],
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: '2',
    title: 'Understanding TypeScript',
    content: '<p>TypeScript brings type safety to JavaScript, making your code more robust...</p>',
    excerpt: 'Explore the benefits of TypeScript and why you should use it in your projects.',
    author: 'Jane Smith',
    authorId: '2',
    authorName: 'Jane Smith',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    tags: ['TypeScript', 'JavaScript', 'Programming'],
    createdAt: new Date('2024-01-20').toISOString(),
    updatedAt: new Date('2024-01-20').toISOString(),
  },
];

// Storage keys
const STORAGE_KEY = 'blogs';

// Get blogs from localStorage or return sample blogs
export function getBlogStorage(): Blog[] {
  if (typeof window === 'undefined') return sampleBlogs;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return sampleBlogs;
    }
  }

  // Initialize with sample blogs
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleBlogs));
  return sampleBlogs;
}

// Save blogs to localStorage
function saveBlogStorage(blogs: Blog[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
}

// Add a new blog
export function addBlog(blog: Omit<Blog, 'id' | 'createdAt' | 'updatedAt'>): Blog {
  const blogs = getBlogStorage();
  const newBlog: Blog = {
    ...blog,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const updatedBlogs = [newBlog, ...blogs];
  saveBlogStorage(updatedBlogs);
  return newBlog;
}

// Update an existing blog
export function updateBlog(id: string, updates: Partial<Omit<Blog, 'id' | 'createdAt'>>): Blog | null {
  const blogs = getBlogStorage();
  const index = blogs.findIndex(blog => blog.id === id);

  if (index === -1) return null;

  const updatedBlog: Blog = {
    ...blogs[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  blogs[index] = updatedBlog;
  saveBlogStorage(blogs);
  return updatedBlog;
}

// Delete a blog
export function deleteBlog(id: string): boolean {
  const blogs = getBlogStorage();
  const filteredBlogs = blogs.filter(blog => blog.id !== id);

  if (filteredBlogs.length === blogs.length) return false;

  saveBlogStorage(filteredBlogs);
  return true;
}

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <main className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-24 py-12 md:py-20 lg:py-28">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-gray-100 mb-4 md:mb-6 leading-tight">
            Your Stories Matter
          </h1>
          <p className="text-base md:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
            Share your thoughts, experiences, and ideas with the world.
            Write, publish, and connect with readers.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-5 mb-16 md:mb-24 px-4">
          <Link href="/blogs" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 px-6 md:px-8 py-3 md:py-6 text-base font-medium rounded-lg">
              Read Blogs
            </Button>
          </Link>
          <Link href="/login" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto border-gray-300 dark:border-gray-700 px-6 md:px-8 py-3 md:py-6 text-base font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
              Start Writing
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 mt-12 md:mt-20">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Easy to Use</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Simple editor with formatting tools to make your content shine.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Share Ideas</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Publish your thoughts and reach readers who care about your topics.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Manage Content</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Edit, update, and organize all your blog posts in one place.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

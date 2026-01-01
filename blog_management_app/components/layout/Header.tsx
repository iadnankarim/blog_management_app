'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, Moon, Sun } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-24 py-4 md:py-5 flex justify-between items-center">
        <Link href="/" className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
          Blog
        </Link>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm" className="px-2">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px]">
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-6">
              <Link href="/blogs" onClick={() => setOpen(false)} className="text-gray-900 dark:text-gray-100 font-medium text-base py-2 hover:text-gray-600 dark:hover:text-gray-300">
                All Posts
              </Link>
              {isAuthenticated ? (
                <>
                  <Link href="/create" onClick={() => setOpen(false)} className="text-gray-900 dark:text-gray-100 font-medium text-base py-2 hover:text-gray-600 dark:hover:text-gray-300">
                    Write New Post
                  </Link>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-2">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                          {user?.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">{user?.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <Button onClick={() => { logout(); setOpen(false); }} variant="outline" className="flex-1">
                        Logout
                      </Button>
                      <Button onClick={toggleTheme} variant="ghost" size="sm" className="px-3">
                        {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <div className="flex items-center gap-3">
                    <Link href="/register" onClick={() => setOpen(false)} className="flex-1">
                      <Button className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200">
                        Sign Up
                      </Button>
                    </Link>
                    <Button onClick={toggleTheme} variant="ghost" size="sm" className="px-3">
                      {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-3 md:gap-6 lg:gap-8">
          <Link href="/blogs" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-[15px] font-medium">
            All Posts
          </Link>

          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2">
                <Link href="/create">
                  <Button className="bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 px-6 py-2.5 text-[15px] font-medium rounded-lg">
                    New Post
                  </Button>
                </Link>
                <Button onClick={toggleTheme} variant="ghost" size="sm" className="px-2">
                  {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </Button>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="rounded-full outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 transition-all">
                    <Avatar className="h-10 w-10 border-2 border-gray-100 dark:border-gray-700">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium">
                        {user?.name[0]}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-2">
                  <div className="px-3 py-2.5 text-sm font-medium text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-700">
                    {user?.name}
                  </div>
                  <DropdownMenuItem onClick={logout} className="cursor-pointer py-2.5 text-[15px]">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm md:text-[15px] font-medium">
                Login
              </Link>
              <div className="flex items-center gap-2">
                <Link href="/register">
                  <Button className="bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 px-4 md:px-6 py-2 md:py-2.5 text-sm md:text-[15px] font-medium rounded-lg">
                    Sign Up
                  </Button>
                </Link>
                <Button onClick={toggleTheme} variant="ghost" size="sm" className="px-2">
                  {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </Button>
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

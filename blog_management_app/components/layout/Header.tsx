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
    <header className="border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Blog
        </Link>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button className="p-2">
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-3 mt-6">
              <Link href="/blogs" onClick={() => setOpen(false)} className="text-gray-900 dark:text-gray-100 font-medium py-2">
                All Posts
              </Link>
              {isAuthenticated ? (
                <>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-2">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                          {user?.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{user?.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button onClick={() => { logout(); setOpen(false); }} variant="outline" className="flex-1 h-9">
                        Logout
                      </Button>
                      <button onClick={toggleTheme} className="p-2 text-gray-700 dark:text-gray-300">
                        {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setOpen(false)}>
                    <Button variant="outline" className="w-full h-9">
                      Login
                    </Button>
                  </Link>
                  <div className="flex items-center gap-2">
                    <Link href="/register" onClick={() => setOpen(false)} className="flex-1">
                      <Button className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 h-9">
                        Sign Up
                      </Button>
                    </Link>
                    <button onClick={toggleTheme} className="p-2 text-gray-700 dark:text-gray-300">
                      {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                    </button>
                  </div>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/blogs" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 text-sm font-medium">
            All Posts
          </Link>

          {isAuthenticated ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="rounded-full focus:outline-none">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm">
                        {user?.name[0]}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-3 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700">
                    {user?.name}
                  </div>
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <button onClick={toggleTheme} className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 text-sm font-medium">
                Login
              </Link>
              <Link href="/register">
                <Button className="bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 h-9 px-4 text-sm">
                  Sign Up
                </Button>
              </Link>
              <button onClick={toggleTheme} className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

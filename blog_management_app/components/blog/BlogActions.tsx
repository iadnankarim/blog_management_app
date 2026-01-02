'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useDeletePostMutation } from '@/lib/redux/hooks/useBlogQueries';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import ErrorAlert from '@/components/ui/ErrorAlert';

interface BlogActionsProps {
  blogId: string;
}

export default function BlogActions({ blogId }: BlogActionsProps) {
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    try {
      setError('');
      await deletePost(blogId).unwrap();
      setOpen(false);
      router.push('/blogs');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to delete post');
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {error && <ErrorAlert message={error} />}
      <div className="flex gap-2">
        <Link href={`/edit/${blogId}`}>
          <Button
            variant="outline"
            size="sm"
            className="px-3 md:px-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
          >
            <Pencil className="h-4 w-4 md:mr-2" />
            <span className="hidden md:inline">Edit</span>
          </Button>
        </Link>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="px-3 md:px-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-red-300 dark:border-red-700 text-red-600 dark:text-red-400"
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Delete</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your blog post.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)} disabled={isDeleting}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

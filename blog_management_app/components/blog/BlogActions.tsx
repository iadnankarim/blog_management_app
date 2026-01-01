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
import { useBlogs } from '@/hooks/useBlogs';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface BlogActionsProps {
  blogId: string;
}

export default function BlogActions({ blogId }: BlogActionsProps) {
  const { removeBlog } = useBlogs();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    removeBlog(blogId);
    router.push('/blogs');
  };

  return (
    <div className="flex gap-2">
      <Link href={`/edit/${blogId}`}>
        <Button variant="outline" size="sm" className="px-3 md:px-4">
          <Pencil className="h-4 w-4 md:mr-2" />
          <span className="hidden md:inline">Edit</span>
        </Button>
      </Link>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive" size="sm" className="px-3 md:px-4">
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
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

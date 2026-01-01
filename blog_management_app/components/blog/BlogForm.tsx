'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { blogSchema } from '@/lib/validation';
import { useAuth } from '@/hooks/useAuth';
import { useBlogs } from '@/hooks/useBlogs';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import RichTextEditor from './RichTextEditor';
import { useState, useEffect } from 'react';
import { Blog } from '@/lib/types';
import { z } from 'zod';

type BlogFormData = z.infer<typeof blogSchema>;

interface BlogFormProps {
  mode: 'create' | 'edit';
  blog?: Blog;
}

export default function BlogForm({ mode, blog }: BlogFormProps) {
  const { user } = useAuth();
  const { createBlog, editBlog } = useBlogs();
  const router = useRouter();
  const [content, setContent] = useState(blog?.content || '');

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: blog?.title || '',
      excerpt: blog?.excerpt || '',
      content: blog?.content || '',
    }
  });

  useEffect(() => {
    setValue('content', content);
  }, [content, setValue]);

  const onSubmit = async (data: BlogFormData) => {
    if (!user) return;

    const blogData: Blog = {
      id: blog?.id || String(Date.now()),
      title: data.title,
      excerpt: data.excerpt,
      content,
      authorId: user.id,
      authorName: user.name,
      authorAvatar: user.avatar,
      createdAt: blog?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: data.tags || [],
    };

    if (mode === 'create') {
      createBlog(blogData);
    } else {
      editBlog(blog!.id, blogData);
    }

    router.push('/blogs');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register('title')} placeholder="Enter blog title" />
        {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea id="excerpt" {...register('excerpt')} rows={2} placeholder="Brief description of your blog" />
        {errors.excerpt && <p className="text-sm text-destructive">{errors.excerpt.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>Content</Label>
        <RichTextEditor value={content} onChange={setContent} />
        {errors.content && <p className="text-sm text-destructive">{errors.content.message}</p>}
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create Blog' : 'Update Blog'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

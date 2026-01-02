'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { blogSchema } from '@/lib/validation';
import { useAuth } from '@/hooks/useAuth';
import { useCreatePostMutation, useUpdatePostMutation } from '@/lib/redux/hooks/useBlogQueries';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import RichTextEditor from './RichTextEditor';
import { useState, useEffect } from 'react';
import { Blog } from '@/lib/types';
import { z } from 'zod';
import ErrorAlert from '@/components/ui/ErrorAlert';

type BlogFormData = z.infer<typeof blogSchema>;

interface BlogFormProps {
  mode: 'create' | 'edit';
  blog?: Blog;
}

export default function BlogForm({ mode, blog }: BlogFormProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [content, setContent] = useState(blog?.content || '');
  const [error, setError] = useState('');

  const [createPost, { isLoading: isCreating }] = useCreatePostMutation();
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: blog?.title || '',
      content: blog?.content || '',
    }
  });

  useEffect(() => {
    setValue('content', content);
  }, [content, setValue]);

  const onSubmit = async (data: BlogFormData) => {
    if (!user) {
      setError('You must be logged in to create a post');
      return;
    }

    try {
      setError('');

      if (mode === 'create') {
        await createPost({
          title: data.title,
          content,
        }).unwrap();
      } else if (blog) {
        await updatePost({
          id: blog.id,
          title: data.title,
          content,
        }).unwrap();
      }

      router.push('/blogs');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save post');
    }
  };

  const isSubmitting = isCreating || isUpdating;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && <ErrorAlert message={error} />}

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register('title')} placeholder="Enter blog title" />
        {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
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

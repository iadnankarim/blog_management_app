import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from './index';
import {
  fetchPosts,
  fetchPostById,
  createPost,
  updatePost,
  deletePost,
  selectAllPosts,
  selectCurrentPost,
  selectPostsLoading,
  selectCurrentPostLoading,
  selectCreateLoading,
  selectUpdateLoading,
  selectDeleteLoading,
  selectPostsError,
  selectCurrentPostError,
} from '../slices/blogSlice';
import type { Blog } from '@/lib/types';

// Query Hooks

export function useGetPostsQuery(params?: { search?: string; tag?: string }) {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectAllPosts);
  const isLoading = useAppSelector(selectPostsLoading);
  const error = useAppSelector(selectPostsError);

  useEffect(() => {
    // Fetch posts with filters whenever params change
    dispatch(fetchPosts(params));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.search, params?.tag]); // Re-fetch when search or tag changes

  return {
    data,
    isLoading,
    isError: !!error,
    error: error ? { message: error } : null,
  };
}

export function useGetPostByIdQuery(id: string) {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectCurrentPost);
  const isLoading = useAppSelector(selectCurrentPostLoading);
  const error = useAppSelector(selectCurrentPostError);

  useEffect(() => {
    if (id && (!data || data.id !== id) && !isLoading) {
      dispatch(fetchPostById(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]); // Only re-fetch when id changes

  return {
    data,
    isLoading,
    isError: !!error,
    error: error ? { message: error } : null,
  };
}

// Mutation Hooks

type MutationPromise<T> = Promise<T> & {
  unwrap: () => Promise<T>;
};

export function useCreatePostMutation() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectCreateLoading);

  const mutate = useCallback(
    (post: { title: string; content: string }) => {
      const promise = dispatch(createPost(post)).then((result) => {
        if (createPost.fulfilled.match(result)) {
          return result.payload;
        } else {
          const errorMessage = result.payload || 'Failed to create post';
          throw new Error(errorMessage);
        }
      });

      (promise as MutationPromise<Blog>).unwrap = () => promise;
      return promise as MutationPromise<Blog>;
    },
    [dispatch]
  );

  return [mutate, { isLoading }] as const;
}

export function useUpdatePostMutation() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectUpdateLoading);

  const mutate = useCallback(
    (payload: { id: string; title?: string; content?: string }) => {
      const promise = dispatch(updatePost(payload)).then((result) => {
        if (updatePost.fulfilled.match(result)) {
          return result.payload;
        } else {
          const errorMessage = result.payload || 'Failed to update post';
          throw new Error(errorMessage);
        }
      });

      (promise as MutationPromise<Blog>).unwrap = () => promise;
      return promise as MutationPromise<Blog>;
    },
    [dispatch]
  );

  return [mutate, { isLoading }] as const;
}

export function useDeletePostMutation() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectDeleteLoading);

  const mutate = useCallback(
    (id: string) => {
      const promise = dispatch(deletePost(id)).then((result) => {
        if (deletePost.fulfilled.match(result)) {
          return result.payload;
        } else {
          const errorMessage = result.payload || 'Failed to delete post';
          throw new Error(errorMessage);
        }
      });

      (promise as MutationPromise<string>).unwrap = () => promise;
      return promise as MutationPromise<string>;
    },
    [dispatch]
  );

  return [mutate, { isLoading }] as const;
}

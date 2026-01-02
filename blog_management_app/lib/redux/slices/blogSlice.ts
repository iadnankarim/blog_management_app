import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { Blog, ApiPost } from '@/lib/types';
import { apiPostToBlog } from '@/lib/types';
import { apiRequest } from '../utils/apiClient';

interface BlogState {
  posts: Blog[];
  postsLoading: boolean;
  postsError: string | null;

  currentPost: Blog | null;
  currentPostLoading: boolean;
  currentPostError: string | null;

  createLoading: boolean;
  createError: string | null;

  updateLoading: boolean;
  updateError: string | null;

  deleteLoading: boolean;
  deleteError: string | null;
}

const initialState: BlogState = {
  posts: [],
  postsLoading: false,
  postsError: null,

  currentPost: null,
  currentPostLoading: false,
  currentPostError: null,

  createLoading: false,
  createError: null,

  updateLoading: false,
  updateError: null,

  deleteLoading: false,
  deleteError: null,
};

// Async Thunks

export const fetchPosts = createAsyncThunk<
  Blog[],
  { search?: string; tag?: string } | void,
  { rejectValue: string }
>(
  'blogs/fetchPosts',
  async (params, { rejectWithValue }) => {
    try {
      // Build query string
      const queryParams = new URLSearchParams();
      if (params && 'search' in params && params.search) {
        queryParams.append('search', params.search);
      }
      if (params && 'tag' in params && params.tag) {
        queryParams.append('tag', params.tag);
      }

      const queryString = queryParams.toString();
      const url = queryString ? `/posts?${queryString}` : '/posts';

      const data = await apiRequest<ApiPost[]>(url);
      return data.map(apiPostToBlog);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch posts');
    }
  }
);

export const fetchPostById = createAsyncThunk<Blog, string, { rejectValue: string }>(
  'blogs/fetchPostById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await apiRequest<ApiPost>(`/posts/${id}`);
      return apiPostToBlog(data);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch post');
    }
  }
);

export const createPost = createAsyncThunk<
  Blog,
  { title: string; content: string },
  { rejectValue: string }
>(
  'blogs/createPost',
  async (post, { rejectWithValue }) => {
    try {
      const data = await apiRequest<ApiPost>('/posts', {
        method: 'POST',
        body: JSON.stringify(post),
      });
      return apiPostToBlog(data);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create post');
    }
  }
);

export const updatePost = createAsyncThunk<
  Blog,
  { id: string; title?: string; content?: string },
  { rejectValue: string }
>(
  'blogs/updatePost',
  async ({ id, ...patch }, { rejectWithValue }) => {
    try {
      const data = await apiRequest<ApiPost>(`/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(patch),
      });
      return apiPostToBlog(data);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update post');
    }
  }
);

export const deletePost = createAsyncThunk<string, string, { rejectValue: string }>(
  'blogs/deletePost',
  async (id, { rejectWithValue }) => {
    try {
      await apiRequest<void>(`/posts/${id}`, {
        method: 'DELETE',
      });
      return id;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete post');
    }
  }
);

// Slice

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    clearCurrentPost: (state) => {
      state.currentPost = null;
      state.currentPostError = null;
    },
    clearErrors: (state) => {
      state.postsError = null;
      state.currentPostError = null;
      state.createError = null;
      state.updateError = null;
      state.deleteError = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Posts
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.postsLoading = true;
        state.postsError = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.postsLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.postsLoading = false;
        state.postsError = action.payload || 'Failed to fetch posts';
      });

    // Fetch Post By ID
    builder
      .addCase(fetchPostById.pending, (state) => {
        state.currentPostLoading = true;
        state.currentPostError = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.currentPostLoading = false;
        state.currentPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.currentPostLoading = false;
        state.currentPostError = action.payload || 'Failed to fetch post';
      });

    // Create Post
    builder
      .addCase(createPost.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.createLoading = false;
        state.posts.unshift(action.payload); // Add to beginning of array
      })
      .addCase(createPost.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload || 'Failed to create post';
      });

    // Update Post
    builder
      .addCase(updatePost.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.updateLoading = false;
        const index = state.posts.findIndex((post) => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
        if (state.currentPost?.id === action.payload.id) {
          state.currentPost = action.payload;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload || 'Failed to update post';
      });

    // Delete Post
    builder
      .addCase(deletePost.pending, (state) => {
        state.deleteLoading = true;
        state.deleteError = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.posts = state.posts.filter((post) => post.id !== action.payload);
        if (state.currentPost?.id === action.payload) {
          state.currentPost = null;
        }
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.deleteLoading = false;
        state.deleteError = action.payload || 'Failed to delete post';
      });
  },
});

// Actions
export const { clearCurrentPost, clearErrors } = blogSlice.actions;

// Selectors
export const selectAllPosts = (state: RootState) => state.blogs.posts;
export const selectCurrentPost = (state: RootState) => state.blogs.currentPost;

export const selectPostsLoading = (state: RootState) => state.blogs.postsLoading;
export const selectCurrentPostLoading = (state: RootState) => state.blogs.currentPostLoading;
export const selectCreateLoading = (state: RootState) => state.blogs.createLoading;
export const selectUpdateLoading = (state: RootState) => state.blogs.updateLoading;
export const selectDeleteLoading = (state: RootState) => state.blogs.deleteLoading;

export const selectPostsError = (state: RootState) => state.blogs.postsError;
export const selectCurrentPostError = (state: RootState) => state.blogs.currentPostError;
export const selectCreateError = (state: RootState) => state.blogs.createError;
export const selectUpdateError = (state: RootState) => state.blogs.updateError;
export const selectDeleteError = (state: RootState) => state.blogs.deleteError;

export const selectPostById = (state: RootState, id: string) =>
  state.blogs.posts.find((post) => post.id === id);

export default blogSlice.reducer;

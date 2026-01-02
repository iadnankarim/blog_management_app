export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatar?: string;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author?: string;
  authorId: string;
  authorName?: string;
  authorAvatar?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    createdAt?: string;
  };
}

// Backend Post type (matches MongoDB schema)
export interface ApiPost {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

// Helper to extract plain text excerpt from HTML content
function extractExcerpt(htmlContent: string): string {
  const text = htmlContent.replace(/<[^>]*>/g, '');
  return text.length > 150 ? text.substring(0, 150) + '...' : text;
}

// Transform function to convert API post to frontend Blog type
export function apiPostToBlog(apiPost: ApiPost): Blog {
  return {
    id: apiPost._id,
    title: apiPost.title,
    content: apiPost.content,
    excerpt: extractExcerpt(apiPost.content),
    authorId: apiPost.author._id,
    authorName: apiPost.author.name,
    authorAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${apiPost.author.name}`,
    createdAt: apiPost.createdAt,
    updatedAt: apiPost.updatedAt,
    tags: [],
  };
}

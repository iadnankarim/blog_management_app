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

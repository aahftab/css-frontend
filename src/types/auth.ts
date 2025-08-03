/**
 * Authentication related types
 */

export interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  sessionId: string | null;
  login: (data: { sessionId: string; user: User } | null) => void;
  logout: () => void;
  setUser: (user: User) => void;
  clearUser: () => void;
  fetchUserProfile: () => Promise<{ success: boolean; data?: User; error?: string }>;
}

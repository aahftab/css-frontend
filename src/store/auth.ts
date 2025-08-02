import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  username: string
  firstName: string
  lastName: string
  email: string
  role: string
  avatar?: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  sessionId: string | null
  login: (sessionId: string) => void
  logout: () => void
  setUser: (user: User) => void
  clearUser: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      sessionId: null,
      login: (sessionId: string) => 
        set({ isAuthenticated: true, sessionId, user: null }),
      logout: () => 
        set({ isAuthenticated: false, user: null, sessionId: null }),
      setUser: (user: User) => 
        set({ user }),
      clearUser: () => 
        set({ user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
)

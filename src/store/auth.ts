import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  name: string
  username: string
  avatar?: string
  email: string
  location: string
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
        set({ isAuthenticated: true, sessionId }),
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

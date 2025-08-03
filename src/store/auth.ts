import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, AuthState } from "@/types/auth";
import { AuthAPI } from "@/lib/api";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      sessionId: null,
      login: (data: { sessionId: string; user: User } | null) => {
        if (data) {
          set({
            isAuthenticated: true,
            sessionId: data.sessionId,
            user: data.user,
          });
        }
      },
      logout: () =>
        set({ isAuthenticated: false, user: null, sessionId: null }),
      setUser: (user: User) => set({ user }),
      clearUser: () => set({ user: null }),
      fetchUserProfile: async () => {
        try {
          const userProfile = await AuthAPI.getUserProfile();
          const userData = userProfile.data?.user || null;
          set({ user: userData });
          return { success: true, data: userData };
        } catch (error) {
          console.error("Error fetching user profile:", error);
          return { success: false, error: "Failed to fetch user profile" };
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

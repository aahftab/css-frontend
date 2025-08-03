import type { LoginRequest, LoginResponse, UserProfileResponse } from "@/types/api";

const BASE_URL = import.meta.env.DEV
  ? ""
  : import.meta.env.VITE_BASE_URL || "http://localhost:3000";

export class AuthAPI {
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important for cookies
        body: JSON.stringify(credentials),
      });

      const data: LoginResponse = await response.json();
      return data;
    } catch {
      throw new Error("Network error occurred during login");
    }
  }

  static async logout(): Promise<void> {
    try {
      await fetch(`${BASE_URL}/api/v1/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  static async getUserProfile(): Promise<UserProfileResponse> {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/user/profile`, {
        method: "GET",
        credentials: "include",
      });

      if (response.status !== 200) {
        throw new Error("Failed to fetch user profile");
      }

      return await response.json();
    } catch {
      throw new Error("Failed to fetch user profile");
    }
  }
}

/**
 * API related types for authentication and user endpoints
 */

import type { User } from './auth';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  statusCode: number;
  data: { sessionId: string; user: User } | null;
  message: string;
  success: boolean;
}

export interface UserProfileResponse {
  statusCode: number;
  data: {
    user: User;
  };
  message: string;
  success: boolean;
}

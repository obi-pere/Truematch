import { create } from 'zustand';
import { authService, type LoginPayload, type RegisterPayload } from '../services/auth.service';
import type { User } from '../types/user';

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isBootstrapping: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  bootstrapSession: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isBootstrapping: true,

  login: async (payload) => {
    const user = await authService.login(payload);
    set({ user, isAuthenticated: true });
  },

  register: async (payload) => {
    const user = await authService.register(payload);
    set({ user, isAuthenticated: true });
  },

  logout: async () => {
    await authService.logout();
    set({ user: null, isAuthenticated: false });
  },

  bootstrapSession: async () => {
    try {
      const user = await authService.getMe();
      set({ user, isAuthenticated: true, isBootstrapping: false });
    } catch (_error) {
      set({ user: null, isAuthenticated: false, isBootstrapping: false });
    }
  }
}));

import { create } from 'zustand';

type AuthState = {
  accessToken: string | null | undefined;
  setAccessToken: (token: string | null | undefined) => void;

  userNo: string | null;
  setUserNo: (userNo: string | null) => void;

  role: string | null;
  setRole: (role: string | null) => void;

  reset: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: undefined,
  setAccessToken: (token) => set({ accessToken: token }),

  userNo: null,
  setUserNo: (userNo) => set({ userNo }),

  role: null,
  setRole: (role) => set({ role }),

  reset: () => set({ accessToken: null, userNo: null, role: null }),
}));

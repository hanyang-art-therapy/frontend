import { create } from 'zustand';

type AuthState = {
  accessToken: string | null | undefined;
  setAccessToken: (token: string | null | undefined) => void;

  userNo: number | null;
  setUserNo: (userNo: number | null) => void;

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

import { create } from "zustand";

export interface User {
  firstName: string;
  lastName: string;
  middleName: string;
  username: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  
  setLoading: (val: boolean) => void;
  setUserAndToken: (user:User, token: string) => void;
  clearUserAndToken: () => void;
}

const useAuthStore = create<AuthState>(set => ({
  user: null,
  loading: false,
  setLoading: (val) => set({ loading: val }),
  token: localStorage.getItem("token"),
  setUserAndToken: (user, token) => set({ user, token}),
  clearUserAndToken: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null});
  },
}))

export default useAuthStore;
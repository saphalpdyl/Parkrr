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

  setUserAndToken?: (user:User, token: string) => void;

  clearUserAndToken?: () => void;
}

const useAuthStore = create<AuthState>(set => ({
  user: null,
  token: localStorage.getItem("token"),
  setUserAndToken: (user, token) => set({ user, token}),
  clearUserAndToken: () =>  set({ user: null, token: null}),
}))

export default useAuthStore;
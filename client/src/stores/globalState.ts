import { create } from "zustand";

interface GlobalState {
  loading: boolean;
  setLoading: (value: boolean) => void;
  startLoading: () => void;
  stopLoading: () => void;
}

const useGlobalStore = create<GlobalState>(set => ({
  loading: false,
  setLoading: (value) => set({ loading: value }),
  startLoading: () => set({ loading: true }),
  stopLoading: () => {
    console.trace()
    set({ loading: false });
  },
}));

export default useGlobalStore;
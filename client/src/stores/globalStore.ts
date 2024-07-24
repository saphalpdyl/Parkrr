import { create } from "zustand";

interface GlobalStore {
  loading: boolean;
  setLoading: (value: boolean) => void;
  startLoading: () => void;
  stopLoading: () => void;
}

const useGlobalStore = create<GlobalStore>(set => ({
  loading: false,
  setLoading: (value) => set({ loading: value }),
  startLoading: () => set({ loading: true }),
  stopLoading: () => {
    console.trace()
    set({ loading: false });
  },
}));

export default useGlobalStore;
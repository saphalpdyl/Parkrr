import { create } from "zustand";

interface GlobalStore {
  editorLoading: boolean;
  rendererLoading: boolean;
  authLoading: boolean;
  setEditorLoading: (value: boolean) => void;
  setRendererLoading: (value: boolean) => void;
  setAuthLoading: (value: boolean) => void;
  startEditorLoading: () => void;
  startRendererLoading: () => void;
  startAuthLoading: () => void;
  stopEditorLoading: () => void;
  stopRendererLoading: () => void;
  stopAuthLoading: () => void;
}

const useGlobalStore = create<GlobalStore>(set => ({
  editorLoading: false,
  rendererLoading: false,
  authLoading: false,

  setEditorLoading: (value) => set({ editorLoading: value }),
  setRendererLoading: (value) => set({ rendererLoading: value }),
  setAuthLoading: (value) => set({ authLoading: value }),

  startEditorLoading: () => set({ editorLoading: true }),
  startRendererLoading: () => set({ rendererLoading: true }),
  startAuthLoading: () => set({ authLoading: true }),

  stopEditorLoading: () => set({ editorLoading: false }),
  stopRendererLoading: () => set({ rendererLoading: false }),
  stopAuthLoading: () => set({ authLoading: false })
}));

export default useGlobalStore;
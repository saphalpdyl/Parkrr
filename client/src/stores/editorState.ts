import { create } from "zustand";
import { EditorItem, Position } from "../routes/editor/types";

interface EditorState {
  items: EditorItem[];
  activeId: string | null;
  selectedItem: {
    item: EditorItem;
    clickPosition: Position;
  } | null;
  collidingId: string | null;
  originPosition: Position | null;
  setItems: (items: EditorItem[]) => void;
  addNewItem: (item: EditorItem) => void;
  deleteItem: (itemId: string) => void;
  updateItemPosition: (
    itemId: string,
    getPosition: (previousItem: EditorItem) => {
      x: number;
      y: number;
      z: number;
    },
  ) => void;
  toggleRotation: (itemId: string) => void;
  deleteAllItems: () => void;
  setActiveId: (id: string | null) => void;
  setSelectedItem: (
    item: {
      item: EditorItem;
      clickPosition: Position;
    } | null,
  ) => void;
  setCollidingId: (id: string | null) => void;
  setOriginPosition: (position: Position | null) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  items: [
    {
      category: "space",
      id: Math.random().toString(36).slice(2),
      spaceType: "standard",
    },
    {
      category: "space",
      id: Math.random().toString(36).slice(2),
      spaceType: "standard",
    },
    {
      category: "space",
      id: Math.random().toString(36).slice(2),
      spaceType: "standard",
    },
    { category: "exit", id: Math.random().toString(36).slice(2) },
    { category: "entrance", id: Math.random().toString(36).slice(2) },
    { category: "office", id: Math.random().toString(36).slice(2) },
  ],
  activeId: null,
  collidingId: null,
  selectedItem: null,
  originPosition: null,
  setItems: (items) => set({ items }),
  addNewItem: (item) => set((state) => ({ items: [...state.items, item] })),
  deleteItem: (itemId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
      selectedItem: itemId === state.selectedItem?.item.id ? null : state.selectedItem,
    })),
  deleteAllItems: () => set({ items: [], selectedItem: null }),
  updateItemPosition: (itemId, getPosition) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              position: getPosition(item),
            }
          : item,
      ),
    })),
  toggleRotation: (itemId) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId ? { ...item, isRotated: !item.isRotated } : item,
      ),
    })),
  setActiveId: (activeId) => set({ activeId }),
  setSelectedItem: (selectedItem) => set({ selectedItem }),
  setCollidingId: (collidingId) => set({ collidingId }),
  setOriginPosition: (originPosition) => set({ originPosition }),
}));

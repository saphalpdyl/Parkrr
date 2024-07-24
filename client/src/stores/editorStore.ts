import { create } from "zustand";
import { EditorItem, Position } from "@/routes/editor/types";

interface EditorStore {
  items: EditorItem[];
  activeId: string | null;
  selectedItem: {
    item: EditorItem;
    clickPosition: Position;
  } | null;
  collidingId: string | null;
  originPosition: Position | null;
  currentEditorId: string | null;
  currentEditor: {name?: string} | null;
  setCurrentEditor: (editor: {name?: string} | null) => void;
  setCurrentEditorId: (id: string | null) => void;
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
  updateRotation: (
    itemId: string,
    getPositionAndRotation: (item: EditorItem) => {
      position: {
        x: number;
        y: number;
        z: number;
      },
      rotation: number
    },
  ) => void;
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

export const useEditorStore = create<EditorStore>((set) => {
  return ({
    items: [],
    activeId: null,
    collidingId: null,
    selectedItem: null,
    originPosition: null,
    currentEditorId: localStorage.getItem("recentEditorId"),
    currentEditor: null,
    setCurrentEditorId: (value) => set({currentEditorId: value}),
    setCurrentEditor: (editor) => set({currentEditor: editor}),
    setItems: (items) => set({items}),
    addNewItem: (item) => set((state) => ({items: [...state.items, item]})),
    deleteItem: (itemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
          selectedItem:
              itemId === state.selectedItem?.item.id ? null : state.selectedItem,
        })),
    deleteAllItems: () => set({items: [], selectedItem: null}),
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
    updateRotation: (itemId, getPositionAndRotation) => {
      set((state) => ({
        items: state.items.map((item) =>
            item.id === itemId
                ? {...item, ...getPositionAndRotation(item)}
                : item,
        ),
      }));
    },
    setActiveId: (activeId) => set({activeId}),
    setSelectedItem: (selectedItem) => set({selectedItem}),
    setCollidingId: (collidingId) => set({collidingId}),
    setOriginPosition: (originPosition) => set({originPosition}),
  });
});

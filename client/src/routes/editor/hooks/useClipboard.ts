import { useCallback } from "react";
import { v4 as uuid } from "uuid";

import { useEditorStore } from "@/stores/editorStore.ts";
import { copyItemToClipboard, tryGetItemFromClipboard } from "../utils/clipboard";
import { SIZE_FACTOR } from "../constants";

export function useClipboard() {
  const { selectedItem, addNewItem } = useEditorStore();

  const copyItem = useCallback(() => {
    if ( selectedItem ) {
      copyItemToClipboard(selectedItem.item);
    }
  }, [selectedItem])

  const pasteItem = () => {
    void async function() {
      const item = await tryGetItemFromClipboard();
      
      if ( !item ) return;

      addNewItem({
        ...item, 
        id: uuid(),
        position: {
          x: (item.position?.x ?? 0) + Math.round((Math.random() * 6) - 3) * SIZE_FACTOR, 
          y: item.position?.y ?? 0,
          z: (item.position?.z ?? 0) + Math.round((Math.random() * 6) - 3) * SIZE_FACTOR,
        }
      });
    }();
  }
  
  return { copyItem, pasteItem };
}
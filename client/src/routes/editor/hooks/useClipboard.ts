import { useCallback } from "react";
import { v4 as uuid } from "uuid";

import { useEditorStore } from "../../../stores/editorState";
import { copyItemToClipboard, tryGetItemFromClipboard } from "../utils/clipboard";

export function useClipboard() {
  const { selectedItem, addNewItem } = useEditorStore();

  const copyItem = useCallback(() => {
    if ( selectedItem ) {
      copyItemToClipboard(selectedItem.item);
    }
  }, [selectedItem])

  const pasteItem = useCallback(() => {
    void async function() {
      const item = await tryGetItemFromClipboard();
      
      if ( !item ) return;

      addNewItem({
        ...item,
        id: uuid(),
      });
    }();
  }, [selectedItem])
  
  return { copyItem, pasteItem };
}
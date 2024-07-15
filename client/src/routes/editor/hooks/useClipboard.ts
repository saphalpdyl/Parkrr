import { useCallback } from "react";
import { useEditorStore } from "../../../stores/editorState";
import { copyItemToClipboard, tryGetItemFromClipboard } from "../utils/clipboard";

export function useClipboard() {
  const { selectedItem, addNewItem } = useEditorStore();

  const copyItem = useCallback(() => {
    if ( selectedItem ) {
      console.log("asd")
      copyItemToClipboard(selectedItem.item);
    }
  }, [selectedItem])

  const pasteItem = useCallback(() => {
    void async function() {
      const item = await tryGetItemFromClipboard();
      
      if ( !item ) return;

      addNewItem({
        ...item,
        id: Math.random().toString(36).slice(2),
      });
    }();
  }, [selectedItem])
  
  return { copyItem, pasteItem };
}
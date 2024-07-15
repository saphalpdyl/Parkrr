import { useEditorStore } from "../../../stores/editorState";

export function useRotation() {
  const { updateRotation } = useEditorStore();

  function rotateItem(itemId: string, direction: "cw" | "ccw") {
    updateRotation(itemId, (previousRotation) => ((previousRotation ?? 0) + (direction === "cw" ? 1 : -1) * 90) % 360);
  }

  return { rotateItem }
}
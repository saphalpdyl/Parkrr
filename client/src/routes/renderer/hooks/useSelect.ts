import useRendererStore from "@/stores/rendererStore.ts";

export default function useSelect() {
  const { selectedObject, setSelectedObject} = useRendererStore();

  const clearSelectedObject = () => setSelectedObject(null);

  return {
    selectedObject,
    setSelectedObject,
    clearSelectedObject,
  }
}
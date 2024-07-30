import useRendererStore from "@/stores/rendererStore.ts";

export default function useHover() {
  const {
    hovering,
    setHovering,
  } = useRendererStore();

  const clearHovering = () => setHovering(null);

  return { hovering, setHovering, clearHovering };
}
import { useRef } from "react";
import { useEditorStore } from "@/stores/editorStore.ts";
import { calculateCenterPosition } from "../utils";

export function useOrigin() {
  const dndContextRef = useRef<HTMLDivElement>(null);
  const { setOriginPosition } = useEditorStore();
  
  function handleCenterOrigin() {
    if (dndContextRef.current) {
      const { width, height } = dndContextRef.current.getBoundingClientRect();
      const { x, z } = calculateCenterPosition(height, width);
  
      setOriginPosition({ x, z });
    } 
  }

  return { dndContextRef, handleCenterOrigin };
}

import { SIZE_FACTOR } from "../constants";

export const calculateCenterPosition = (height: number, width: number) => {
  // Calculate center position
  // - SIZE_FACTOR * 3 to compensate for the DndContext being 
  // pushed to the right by almost 3 SIZE_FACTOR worth of space
  const centerX = Math.round((width / 2 - SIZE_FACTOR * 3) / SIZE_FACTOR) * SIZE_FACTOR;
  const centerZ = Math.round((height / 2) / SIZE_FACTOR) * SIZE_FACTOR;

  return { x: centerX, z: centerZ}  
}
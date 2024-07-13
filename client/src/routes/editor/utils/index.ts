import { SIZE_FACTOR } from "../constants";

export const calculateCenterPosition = (height: number, width: number) => {
  // Calculate center position
  const centerX = Math.round((width / 2) / SIZE_FACTOR) * SIZE_FACTOR;
  const centerZ = Math.round((height / 2) / SIZE_FACTOR) * SIZE_FACTOR;

  return { x: centerX, z: centerZ}  
}
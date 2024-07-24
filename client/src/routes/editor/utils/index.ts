import { SIZE_FACTOR } from "../constants";

export const calculateCenterPosition = (height: number, width: number) => {
  // Calculate center position
  // - SIZE_FACTOR * 3 to compensate for the DndContext being 
  // pushed to the right by almost 3 SIZE_FACTOR worth of space
  const centerX = Math.round((width / 2 - SIZE_FACTOR * 3) / SIZE_FACTOR) * SIZE_FACTOR;
  const centerZ = Math.round((height / 2) / SIZE_FACTOR) * SIZE_FACTOR;

  return { x: centerX, z: centerZ}  
}

function hexToRGB(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export function selectMatchingContrastColor(hex: string, darkColor = "#000000", lightColor = "#ffffff") {
  const rgb = hexToRGB(hex);
  if ( !rgb ) return null;

  const { r, g, b } = rgb;
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return (yiq >= 128) ? darkColor : lightColor;
}
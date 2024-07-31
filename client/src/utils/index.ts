export const convertToRadians = (degrees: number) => degrees * Math.PI / 180;

export const convertUsernameToShortDisplay = (name: string) => {
  const split = name.split(' ');
  if ( split.length > 1 )
    return split.map( v => v.toUpperCase()).join('');

  return split[0].slice(0,2).toUpperCase();
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
  if (!rgb) return null;

  const { r, g, b } = rgb;
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return (yiq >= 128) ? darkColor : lightColor;
}

export function calculateDistance(pointA: vec3, pointB: vec3) {
  const dx = pointA.x - pointB.x;
  const dy = pointA.y - pointB.y;
  const dz = pointA.z - pointB.z;

  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
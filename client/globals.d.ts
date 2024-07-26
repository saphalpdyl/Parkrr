declare module '*.svg' {
  const content: string;
  export default content;
}

declare interface vec3 {
  x: number;
  y: number;
  z: number;
}

declare interface vec2 {
  x: number;
  y: number;
}
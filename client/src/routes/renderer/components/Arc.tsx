import { useMemo, useRef } from "react";
import { QuadraticBezierCurve3, Vector3 } from "three";
import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { Line2 } from "three/examples/jsm/lines/Line2";

interface ArcProps {
  start: vec3;
  end: vec3;
  height?: number;
  color?: string;
  lineWidth?: number;
  segments?: number;
}

function Arc({
               start,
               end,
               height = 1,
               color = "white",
               lineWidth = 1,
               segments = 50
             }: ArcProps) {

  const lineRef = useRef<Line2>(null);

  const points = useMemo(() => {
    const startVec = new Vector3(start.x, start.y, start.z);
    const endVec = new Vector3(end.x, end.y, end.z);

    const midPoint = new Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
    const controlPoint = new Vector3(midPoint.x, midPoint.y + height, midPoint.z);

    const curve = new QuadraticBezierCurve3(startVec, controlPoint, endVec);
    return curve.getPoints(segments).map(point => [point.x, point.y, point.z] as [number, number, number]);
  }, [start, end, height, segments]);

  useFrame((state) => {
    if (lineRef.current && lineRef.current.material) {
      lineRef.current.material.dashOffset = state.clock.getElapsedTime() * -3;
    }
  });

  return (
    <>
      <Line
        ref={lineRef}
        points={points}
        color={color}
        lineWidth={lineWidth}
        dashed
        dashSize={0.2}
        gapSize={0.5}
      />
      <mesh position={[end.x,end.y,end.z]}>
        <boxGeometry args={[0.2,0.2,0.2]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </>
  );
}

export default Arc;
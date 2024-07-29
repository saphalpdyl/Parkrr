import { ParkingSpaceType } from "@/types/parking";
import { parkingSpacesProperties } from "@/constants";
import { useSpring, animated } from "@react-spring/three";
import { useState } from "react";

interface ParkingSpaceProps {
  position: vec3;
  rotation: number;
  spaceType: ParkingSpaceType;
  id: string;
  args: [number,number,number];
  occupied: boolean;
  pinged ?: boolean;
}

function ParkingSpace({
  position,
  rotation,
  spaceType,
  id,
  args,
  pinged,
}: ParkingSpaceProps) {
  const color  = parkingSpacesProperties.find(space => space.spaceType === spaceType)?.color ?? "#fff";
  const [hovering, setHovering] = useState(false);

  const materialSpring = useSpring({
    opacity: pinged ? 0.3 : 1,
  });

  const positionY = position.y + (hovering ? 0.25 : 0);

  const meshSpring = useSpring({
    position: pinged ? [position.x, positionY + 0.5, position.z] : [position.x, positionY, position.z],
  });

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    <animated.mesh
      onPointerOver={() => setHovering(true)}
      onPointerOut={() => setHovering(false)}
      {...meshSpring}
      rotation={[0, rotation, 0]}
      key={id}
    >
      <boxGeometry args={args} />
      <animated.meshStandardMaterial {...materialSpring} color={color} transparent/>
    </animated.mesh>
  )
}

export default ParkingSpace;

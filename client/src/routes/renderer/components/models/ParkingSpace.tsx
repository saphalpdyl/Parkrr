import { ParkingSpaceType } from "@/types/parking";
import { parkingSpacesProperties } from "@/constants";
import { useSpring, animated } from "@react-spring/three";

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
  occupied,
  pinged,
}: ParkingSpaceProps) {

  const color  = parkingSpacesProperties.find(space => space.spaceType === spaceType)?.color ?? "#fff";

  const materialSpring = useSpring({
    opacity: pinged ? 0.3 : 1,
  });

  const meshSpring = useSpring({
    position: pinged ? [position.x, position.y + 0.5, position.z] : [position.x, position.y, position.z],
  });

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    <animated.mesh
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

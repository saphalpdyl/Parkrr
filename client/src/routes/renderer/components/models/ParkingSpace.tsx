import { ParkingSpaceType } from "@/types/parking";
import { parkingSpacesProperties } from "@/constants";
import { useSpring, animated } from "@react-spring/three";
import { Select } from "@react-three/postprocessing";
import useHover from "@/routes/renderer/hooks/useHover.ts";

interface ParkingSpaceProps {
  position: vec3;
  rotation: number;
  spaceType: ParkingSpaceType;
  id: string;
  args: [number,number,number];
  occupied: boolean;
  pinged ?: boolean;
  selected : boolean;
  hovering: boolean;
  onHoverHandler: () => void;
  onSelectHandler: () => void;
}

function ParkingSpace({
  position,
  rotation,
  spaceType,
  id,
  args,
  pinged,
  hovering,
  selected,
  onHoverHandler,
  onSelectHandler,
}: ParkingSpaceProps) {
  const { clearHovering } = useHover();

  const color  = parkingSpacesProperties.find(space => space.spaceType === spaceType)?.color ?? "#fff";

  const materialSpring = useSpring({
    opacity: pinged ? 0.3 : 1,
  });

  const positionY = position.y + (hovering ? 0.25 : 0);

  const meshSpring = useSpring({
    position: pinged ? [position.x, positionY + 0.5, position.z] : [position.x, positionY, position.z],
  });

  return (
    <Select enabled={hovering || selected}>
    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
    {/* @ts-expect-error*/}
      <animated.mesh
        onClick={onSelectHandler}
        onPointerOver={onHoverHandler}
        onPointerOut={clearHovering}
        {...meshSpring}
        rotation={[0, rotation, 0]}
        key={id}
      >
        <boxGeometry args={args} />
        <animated.meshStandardMaterial {...materialSpring} color={color} transparent/>
      </animated.mesh>
    </Select>
  )
}

export default ParkingSpace;

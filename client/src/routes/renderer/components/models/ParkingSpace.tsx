import { ParkingSpaceType } from "@/types/parking";
import { parkingSpacesProperties } from "@/constants";

interface ParkingSpaceProps {
  position: vec3;
  rotation: number;
  spaceType: ParkingSpaceType;
  id: string;
  args: [number,number,number];
  occupied: boolean;
}

function ParkingSpace({
  position,
  rotation,
  spaceType,
  id,
  args,
  occupied,
}: ParkingSpaceProps) {

  console.log(parkingSpacesProperties, spaceType);
  const color  = parkingSpacesProperties.find(space => space.spaceType === spaceType)?.color ?? "#fff";

  return (
    <mesh
      position={[position.x, position.y, position.z]}
      rotation={[0, rotation, 0]}
      key={id}
    >
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

export default ParkingSpace;
import { ParkingSpaceType } from "@/types/parking";

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

  return (
    <mesh
      position={[position.x, position.y, position.z]}
      rotation={[0, rotation, 0]}
      key={id}
    >
      <boxGeometry args={args} />
      <meshStandardMaterial color='white' />
    </mesh>
  )
}

export default ParkingSpace;
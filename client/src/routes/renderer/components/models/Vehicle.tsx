import { useMemo } from "react";
import FBXLoader from "./FBXLoader";

const VEHICLE_PATH = [
  "Muscle 2.fbx",
  "Muscle.fbx",
  "Police Muscle.fbx",
  "Police Sedan.fbx",
  "Police Sports.fbx",
  "Police SUV.fbx",
  "Taxi.fbx"
]

interface VehicleFBXProps {
  rotation?: [number, number, number];
  position?: [number, number, number]
  scale?: number;
}

function VehicleFBX(props: VehicleFBXProps) {
  const vehicle = useMemo(() => VEHICLE_PATH[Math.floor(Math.random() * (VEHICLE_PATH.length - 1))] , []);

  return <FBXLoader {...props} path={`/${vehicle}`} scale={0.006} />
}

export default VehicleFBX;
import { useFBX } from "@react-three/drei"
import { Suspense } from "react";

interface FBXLoaderProps {
  rotation?: [number, number, number];
  position?: [number, number, number]
  scale?: number;
  path: string;
}

function FBXLoader(props: FBXLoaderProps) {
  const fbx = useFBX(props.path);
  const obj = fbx.clone();

  // return <primitive object={fbx} dispose={null} />
  return <Suspense fallback={null}>
    <mesh {...props}>
      <primitive object={obj} dispose={null} />
    </mesh>
  </Suspense>
}

export default FBXLoader;
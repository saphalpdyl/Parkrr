import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

type CameraMode = "2d" | "3d";

interface CameraControllerProps {
  cameraMode: CameraMode;
}

function CameraController({ cameraMode } : CameraControllerProps) {
  const { camera } = useThree();

  useEffect(() => {
    if (cameraMode === "2d") {
      camera.position.set(0, 30, 0);
      camera.updateProjectionMatrix();
    }
  }, [cameraMode]);

  return null;
}

export default CameraController;
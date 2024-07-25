import { create } from "zustand";
import { IParkingLot } from "@/types/parking";

type CameraMode = "2d" | "3d";

interface RendererStore {
  currentParkingLotId: string | null;
  currentParkingLot: IParkingLot | null;
  setCurrentParkingLotId: (currentParkingLotId: string | null) => void;
  setCurrentParkingLot: (currentParkingLot: IParkingLot | null) => void;
  cameraMode: CameraMode;
  setCameraMode: (mode: CameraMode) => void;
}

const useRendererStore = create<RendererStore>(set => ({
  currentParkingLotId: null,
  currentParkingLot: null,
  setCurrentParkingLot: parkingLot => set({ currentParkingLot: parkingLot }),
  setCurrentParkingLotId: parkingLotId => set({ currentParkingLotId: parkingLotId }),
  cameraMode: "3d",
  setCameraMode: (mode) => set({ cameraMode: mode }),
}));

export default useRendererStore;

import { create } from "zustand";
import { IParkingLot, IParkingSpace, OtherObject } from "@/types/parking";

type CameraMode = "2d" | "3d";

interface RendererStore {
  currentParkingLotId: string | null;
  currentParkingLot: IParkingLot | null;
  setCurrentParkingLotId: (currentParkingLotId: string | null) => void;
  setCurrentParkingLot: (currentParkingLot: IParkingLot | null) => void;
  cameraMode: CameraMode;
  setCameraMode: (mode: CameraMode) => void;
  pinging: boolean;
  setPinging: (val: boolean) => void;
  hovering: IParkingSpace | OtherObject | null;
  setHovering: (val: IParkingSpace | OtherObject | null) => void;
}

const useRendererStore = create<RendererStore>(set => ({
  currentParkingLotId: null,
  currentParkingLot: null,
  setCurrentParkingLot: parkingLot => set({ currentParkingLot: parkingLot }),
  setCurrentParkingLotId: parkingLotId => set({ currentParkingLotId: parkingLotId }),
  cameraMode: "3d",
  setCameraMode: (mode) => set({ cameraMode: mode }),
  pinging: false,
  setPinging: value => set({ pinging: value }),
  hovering: null,
  setHovering: (hover) => set({ hovering: hover, }),
}));

export default useRendererStore;

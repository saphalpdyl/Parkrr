import { create } from "zustand";
import { ParkingLot } from "@/types/parking";

interface RendererStore {
  currentParkingLotId: string | null;
  currentParkingLot: ParkingLot | null;
  setCurrentParkingLotId: (currentParkingLotId: string | null) => void;
  setCurrentParkingLot: (currentParkingLot: ParkingLot | null) => void;
}

const useRendererStore = create<RendererStore>(set => ({
  currentParkingLotId: null,
  currentParkingLot: null,
  setCurrentParkingLot: parkingLot => set({ currentParkingLot: parkingLot }),
  setCurrentParkingLotId: parkingLotId => set({ currentParkingLotId: parkingLotId }),
}));

export default useRendererStore;
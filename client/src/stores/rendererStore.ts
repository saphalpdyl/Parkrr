import { create } from "zustand";
import { IParkingLot } from "@/types/parking";

interface RendererStore {
  currentParkingLotId: string | null;
  currentParkingLot: IParkingLot | null;
  setCurrentParkingLotId: (currentParkingLotId: string | null) => void;
  setCurrentParkingLot: (currentParkingLot: IParkingLot | null) => void;
}

const useRendererStore = create<RendererStore>(set => ({
  currentParkingLotId: null,
  currentParkingLot: null,
  setCurrentParkingLot: parkingLot => set({ currentParkingLot: parkingLot }),
  setCurrentParkingLotId: parkingLotId => set({ currentParkingLotId: parkingLotId }),
}));

export default useRendererStore;
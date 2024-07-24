import useRendererStore from "@/stores/rendererStore.ts";
import { useEffect } from "react";
import axios from "axios";
import { ParkingLot } from "@/types/parking";
import useAuth from "@/hooks/useAuth.ts";
import useGlobalStore from "@/stores/globalStore.ts";

export default function useRenderer() {
  const {
    currentParkingLot,
    currentParkingLotId,
    setCurrentParkingLot,
    setCurrentParkingLotId,
  } = useRendererStore();

  const { token } = useAuth();
  const { startRendererLoading, stopRendererLoading } = useGlobalStore();

  async function loadParkingLot(id: string) {
    startRendererLoading();

    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/app/lots/${id}`);

      setCurrentParkingLot(response.data as ParkingLot);
    } catch(e) {
      setCurrentParkingLot(null);
      setCurrentParkingLotId(null);
    } finally {
      stopRendererLoading();
    }
  }

  useEffect(() => {
    void async function() {
      if ( token ) {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/app/lots/`);

        if (!response.data.length) return;

        setCurrentParkingLotId(response.data[0]._id || null);
      }
    }();
  }, [token]);

  return {
    currentParkingLot,
    currentParkingLotId,
    loadParkingLot,
  }
}
import useRendererState from "@/stores/rendererState.ts";
import { useEffect } from "react";
import axios from "axios";
import { ParkingLot } from "@/types/parking";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth.ts";

export default function useRenderer() {
  const {
    currentParkingLot,
    currentParkingLotId,
    setCurrentParkingLot,
    setCurrentParkingLotId,
    setRendererLoading,
    rendererLoading,
  } = useRendererState();

  const { token } = useAuth();

  async function loadParkingLot(id: string) {
    setRendererLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/app/lots/${id}`);

      setCurrentParkingLot(response.data as ParkingLot);
    } catch(e) {
      setCurrentParkingLot(null);
      setCurrentParkingLotId(null);
      toast.error("Something went wrong");
    } finally {
      setRendererLoading(false);
    }
  }

  useEffect(() => {
    void async function() {
      if ( token ) {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/app/lots/`);
        setCurrentParkingLotId(response.data[0]._id || null);
      }
    }();
  }, [token]);

  return {
    currentParkingLot,
    currentParkingLotId,
    loadParkingLot,
    rendererLoading,
    setRendererLoading,
  }
}
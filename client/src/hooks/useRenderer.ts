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
  } = useRendererState();

  const { token } = useAuth();

  async function loadParkingLot(id: string) {
    toast.loading("Loading", {id: "loading"});
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/app/lots/${id}`);

      setCurrentParkingLot(response.data as ParkingLot);
      toast.success("Loaded", {id: "loading"});
    } catch(e) {
      setCurrentParkingLot(null);
      setCurrentParkingLotId(null);
      toast.error("Something went wrong", {id: "loading"});
    }
  }

  useEffect(() => {
    if ( currentParkingLotId )  loadParkingLot(currentParkingLotId);
  }, [currentParkingLotId]);

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
  }
}
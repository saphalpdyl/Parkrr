import UserProfile from "@/components/UserProfile.tsx";
import useRenderer from "@/hooks/useRenderer.ts";
import { Link } from "react-router-dom";
import { Pencil } from "lucide-react";

function StatusBar() {
  const { currentParkingLot } = useRenderer();

  return <div className="absolute w-40 bg-white z-20 shadow-md rounded-lg text-slate-900 flex gap-2 p-2 m-3">
    <UserProfile menuPosition="bottom"/>
    <div className="flex flex-col justify-evenly text-xs font-bold">
      <span>{ currentParkingLot?.name ?? "Untitled" }</span>
      <Link to="/editor" className="flex gap-1 items-center underline text-blue-500 hover:text-blue-600 ">
        <span>Go to editor</span>
        <Pencil size={12} />
      </Link>
    </div>
  </div>
}

export default StatusBar;
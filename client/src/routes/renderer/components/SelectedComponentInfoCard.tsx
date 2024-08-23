import useSelect from "@/routes/renderer/hooks/useSelect";
import { X } from "lucide-react";

function SelectedComponentInfoCard () {
  const { selectedObject, clearSelectedObject } = useSelect();

  // Return null if selectedObject is null or not a parking space
  if ( !selectedObject || !("occupied" in selectedObject) ) return null;

  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-96 rounded-l-lg bg-white z-40 shadow-lg p-4 flex flex-col">
      <div className="flex justify-between items-center">
        <span className="capitalize font-bold text-lg">Parking Space</span>
        <div onClick={clearSelectedObject} className="flex items-center justify-center px-4 hover:cursor-pointer py-1">
          <X className="text-gray-400" size={16} />
        </div>
      </div>
      <span className="capitalize font-light text-sm text-gray-400">Standard</span>
    </div>
  )
}

export default SelectedComponentInfoCard;
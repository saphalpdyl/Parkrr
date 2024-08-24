import useSelect from "@/routes/renderer/hooks/useSelect";
import { Canvas } from "@react-three/fiber";
import { X } from "lucide-react";
import ParkingSpace from "./models/ParkingSpace";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SpotBookingPopoverForm from "./SpotBookingPopoverForm";

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
      <span className="text-[10px] text-slate-300">{ selectedObject.id }</span>

      <div className="flex relative">
        <div className="absolute bottom-0 right-0 font-semibold text-gray-200">
          H: { selectedObject.args[0] }
          &nbsp;
          W: { selectedObject.args[2] }
        </div>
        <div>
          <Canvas 
            camera={{
              position: [-3,3,3],
            }}>
              <ambientLight intensity={3} />
              <ParkingSpace
                position={{x:0, y:0, z:0}}
                rotation={selectedObject.rotation}
                spaceType={selectedObject.type}
                id={selectedObject.id}
                args={selectedObject.args}
                occupied={selectedObject.occupied}
                pinged={false}
                hovering={false}
                selected={false}
                onHoverHandler={() => {}}
                onSelectHandler={() => {}}
              />
          </Canvas>
        </div>
      </div>
      <Popover>
        <PopoverTrigger>
          <div className="bg-blue-500 font-semibold text-white flex items-center justify-center rounded-sm py-1 mt-3 hover:bg-blue-600 cursor-pointer">
            Book spot
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <SpotBookingPopoverForm />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default SelectedComponentInfoCard;
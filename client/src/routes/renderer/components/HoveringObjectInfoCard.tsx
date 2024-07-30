import useHover from "@/routes/renderer/hooks/useHover.ts";
import { calculateDistance } from "@/utils";

function HoveringObjectInfoCard() {
  const { hovering } = useHover();

  const objectDistance = hovering && calculateDistance(hovering.position, {
    x: 0, y: 0, z: 0,
  }).toFixed(2);

  return (
    <div className={`
      absolute z-40 top-28 left-3 w-52 bg-white rounded-lg shadow-lg p-3
      transition-opacity
      ${hovering ? "opacity-100" : "opacity-0 delay-75"}
      flex flex-col
      `}>
      {
        hovering && (
          <>
            <span className="text-xs text-gray-500 font-semibold">Currently hovering</span>
            <span className="text-sm text-gray-700 font-bold capitalize mt-1">{ "type" in hovering ? `${hovering.type} Parking Space` : "" }</span>
            <span className="text-[7px] text-gray-400 font-bold">{hovering.id}</span>
            <span className="text-xs text-emerald-600 font-regular">{objectDistance} units away from origin</span>

          </>
        )
      }
    </div>
  );
}

export default HoveringObjectInfoCard;
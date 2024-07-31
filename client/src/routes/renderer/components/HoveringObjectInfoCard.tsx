import useHover from "@/routes/renderer/hooks/useHover.ts";
import calculateAndReturnNearestEntrance from "@/routes/renderer/helpers/calculateAndReturnNearestEntrance.ts";
import useRenderer from "@/hooks/useRenderer.ts";
import { Skeleton } from "@/components/ui/skeleton";

function HoveringObjectInfoCard() {
  const { hovering } = useHover();
  const { currentParkingLot } = useRenderer();

  const nearestEntranceData = hovering && "type" in hovering && calculateAndReturnNearestEntrance(hovering.position, currentParkingLot!.floors[0]!.entrances!);

  return (
    <div className={`
      absolute z-10 top-28 left-3 w-52 bg-white rounded-lg shadow-lg p-3
      transition-all
      flex flex-col
      ${hovering ? "opacity-100" : "opacity-0 delay-75"}
      `}>
      {
        hovering != null ? (
          <>
            <span className="text-xs text-gray-500 font-semibold">Currently hovering</span>
            <span className="text-sm text-gray-700 font-bold capitalize mt-1">{ "type" in hovering ? `${hovering.type} Parking Space` : "" }</span>
            <span className="text-[7px] text-gray-400 font-bold">{hovering.id}</span>
            {
              nearestEntranceData && (
                <span className="text-[9px] mt-2 text-emerald-600 font-regular">{nearestEntranceData.shortestDistance.toFixed(1)} units away from the nearest entrance</span>

              )
            }

          </>
        ) : (
          <>
            <Skeleton className="h-[10px] w-1/2" />
            <Skeleton className="h-[13px] w-2/3 mt-2" />
            <Skeleton className="h-[7px] w-2/3 mt-2" />
            <Skeleton className="h-[7px] w-full mt-4" />

          </>
        )
      }
    </div>
  );
}

export default HoveringObjectInfoCard;
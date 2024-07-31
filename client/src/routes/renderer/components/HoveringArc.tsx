import useHover from "@/routes/renderer/hooks/useHover.ts";
import calculateAndReturnNearestObject from "@/routes/renderer/helpers/calculateAndReturnNearestObject.ts";
import useRenderer from "@/hooks/useRenderer.ts";
import Arc from "@/routes/renderer/components/Arc.tsx";

function HoveringArc() {
  const { currentParkingLot } = useRenderer();
  const { hovering} = useHover();

  if (!hovering) return;

  const nearestEntranceData = "type" in hovering && calculateAndReturnNearestObject(hovering.position, currentParkingLot!.floors[0]!.entrances!);
  const nearestExitData = "type" in hovering && calculateAndReturnNearestObject(hovering.position, currentParkingLot!.floors[0]!.exits!);

  return <>
    {
      nearestEntranceData && <Arc start={hovering.position} end={nearestEntranceData.nearestObject!.position} color="#03c04a" height={7}/>
    }
    {
      nearestExitData && <Arc start={hovering.position} end={nearestExitData.nearestObject!.position} color="#ffa500"  height={7}/>
    }
  </>

}

export default  HoveringArc;
import useHover from "@/routes/renderer/hooks/useHover.ts";
import calculateAndReturnNearestObject from "@/routes/renderer/helpers/calculateAndReturnNearestObject.ts";
import useRenderer from "@/hooks/useRenderer.ts";
import Arc from "@/routes/renderer/components/Arc.tsx";
import useRendererStore from "@/stores/rendererStore.ts";

function HoveringArc() {
  const { currentParkingLot } = useRenderer();
  const { hovering} = useHover();
  const { showGuidingLines, selectedObject } = useRendererStore();

  if ( !(hovering || selectedObject) || !showGuidingLines) return;

  const targetObject = selectedObject || hovering;

  if ( !targetObject ) return;

  const nearestEntranceData = "type" in targetObject && calculateAndReturnNearestObject(targetObject.position, currentParkingLot!.floors[0]!.entrances!);
  const nearestExitData = "type" in targetObject && calculateAndReturnNearestObject(targetObject.position, currentParkingLot!.floors[0]!.exits!);

  return <>
    {
      nearestEntranceData && <Arc start={targetObject.position} end={nearestEntranceData.nearestObject!.position} color="#03c04a" height={7}/>
    }
    {
      nearestExitData && <Arc start={targetObject.position} end={nearestExitData.nearestObject!.position} color="#ffa500"  height={7}/>
    }
  </>

}

export default  HoveringArc;
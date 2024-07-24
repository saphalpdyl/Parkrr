import { useEditorStore } from "@/stores/editorStore.ts";
import { SIZE_FACTOR } from "../constants";

export function useRotation() {
  const { updateRotation } = useEditorStore();

  function rotateItem(itemId: string, direction: "cw" | "ccw") {
    updateRotation(
      itemId, 
      (item) => {
        const previousRotation = item.rotation ?? 0;
        const rotation = (previousRotation + (direction === "cw" ? 1 : -1) * 90);
        
        const { x: positionX, z: positionY } = item.position!;
        let x = positionX;
        let y = positionY;
        
        const width = item.args![0];
        const height = item.args![2];

        // deltaDistance = (w-h)
        const deltaDistance = (width - height) * SIZE_FACTOR;
        if ( direction === "cw" ) {
          // Clockwise rotation
          if ( Math.abs(previousRotation) === 180 ) {
            // Going from 180 to 270
            // x - (w - h) -> x
            // y -> y - (w - h)
            x += deltaDistance;
            y -= deltaDistance;
          } else if ( Math.abs(previousRotation) === 270 ) {
            // Going 270 to 360/0
            // x -> x
            // y - (w - h) -> y
            y += deltaDistance;
          } else if ( Math.abs(previousRotation) === 90 ) {
            // Going from 90 to 180
            // x -> x - (w - h)
            // y -> y
            x -= deltaDistance;
          }
        } else {
          // Counterclockwise rotation
          if ( (360 - Math.abs(rotation)) === 270 ) {
            // Going from 0 to 270
            // x -> x
            // y -> y - (w-h)
            y -= deltaDistance;
          } else if ( (360 - Math.abs(rotation)) === 180 ) {
            // Going from 270 to 180
            // x -> x - (w-h)
            // y - (w-h) -> y
            x -= deltaDistance;
            y += deltaDistance;
          } else if ( (360 - Math.abs(rotation)) === 90 ) {
            // Going from 180 to 90
            // x - (w-h) -> x
            // y -> y
            x += deltaDistance;
          }
        }

        return {
          rotation: rotation % 360 ,
          position: {
            x,
            y: 0,
            z: y,
          },
        }
      },
    );
  }

  return { rotateItem }
}
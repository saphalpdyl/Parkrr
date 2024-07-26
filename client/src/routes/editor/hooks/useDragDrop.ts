import { DragEndEvent, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useEditorStore } from "@/stores/editorStore.ts";
import { createSnapModifier } from "@dnd-kit/modifiers";
import { Position } from "../types";
import { SIZE_FACTOR } from "../constants";

export function useDragDrop() {
  const {
    updateItemPosition, 
    setActiveId, 
    setSelectedItem, 
    setCollidingId, 
    setOriginPosition 
  } = useEditorStore();

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    setSelectedItem(null);
  };

  const handleDragEnd = (event: DragEndEvent, originPosition: Position) => {
    const { active, delta } = event;

    if ( active.id === "origin" ) {
      setOriginPosition(({
        x: (originPosition?.x ?? 0) + delta.x,
        z: (originPosition?.z ?? 0) + delta.y,
      }));
      return;
    }

    updateItemPosition(active.id.toString(), (item) => ({
      // Y is the axis pointing out of the screen for Three.js
      x: (item.position?.x || 0) + delta.x,
      y: 0,
      z: (item.position?.z || 0) + delta.y,
    }));

    setActiveId(null);
    setCollidingId(null);
  };

  const handleDragMove = (event: any) => {
    const { collisions } = event;
    if (collisions && collisions.length > 0) {
      setCollidingId(collisions[0].id);
    } else {
      setCollidingId(null);
    }
  };

  const gridSnapModifier = createSnapModifier(SIZE_FACTOR);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  return {
    handleDragEnd,
    handleDragMove,
    handleDragStart,
    gridSnapModifier,
    sensors
  };
}
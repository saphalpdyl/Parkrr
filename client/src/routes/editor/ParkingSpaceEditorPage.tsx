import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  rectIntersection,
} from "@dnd-kit/core";

import {
  createSnapModifier,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import type { Position, Item } from "./types";
import DraggableItem from "./components/DraggableItem";

const DragAndDropPage = () => {
  const [items] = useState<Item[]>([
    { id: "1", content: "Item 1" },
    { id: "2", content: "Item 2" },
    { id: "3", content: "Item 3" },
  ]);
  const [positions, setPositions] = useState<Record<string, Position>>({});
  const [activeId, setActiveId] = useState<string | null>(null);
  const [collidingId, setCollidingId] = useState<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;

    setPositions((prev) => ({
      ...prev,
      [active.id]: {
        x: (prev[active.id]?.x || 0) + delta.x,
        y: (prev[active.id]?.y || 0) + delta.y,
      },
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

  const gridSize = 20;
  const gridSnapModifier = createSnapModifier(gridSize);

  return (
    <div className="relative flex h-screen w-screen items-center overflow-hidden">
      <div className="fixed left-0 z-20 h-1/2 w-16 rounded-e-xl bg-gray-100 shadow-md transition-all hover:w-24"></div>
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-screen w-screen bg-[#f0f0f0]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width={gridSize}
              height={gridSize}
              patternUnits="userSpaceOnUse"
            >
              <path
                d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
                fill="none"
                stroke="#6662"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragMove={handleDragMove}
        collisionDetection={rectIntersection}
        modifiers={[gridSnapModifier, restrictToParentElement]}
      >
        <div className="relative ms-20 h-full w-[calc(100%-5rem)] bg-transparent p-4">
          {items.map((item) => (
            <DraggableItem
              key={item.id}
              item={item}
              position={positions[item.id] || { x: 0, y: 0 }}
              isColliding={item.id === collidingId}
              hide={item.id === activeId}
            />
          ))}
          <DragOverlay>
            {activeId ? (
              <div className="h-full rounded-md border-2 border-[#3b82f6] p-2 text-white shadow-sm"></div>
            ) : null}
          </DragOverlay>
        </div>
      </DndContext>
    </div>
  );
};

export default DragAndDropPage;

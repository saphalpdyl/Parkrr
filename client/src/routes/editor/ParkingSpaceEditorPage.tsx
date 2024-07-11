import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  rectIntersection,
  useSensors,
  useSensor,
  PointerSensor,
} from "@dnd-kit/core";

import {
  createSnapModifier,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import type { EditorItem, ParkingItemCategory, Position } from "./types";
import DraggableItem from "./components/DraggableItem";
import EditorSidebar from "./components/EditorSidebar";
import BackgroundGrid from "./components/BackgroundGrid";
import { Organization, OtherObject, ParkingSpace } from "../../types/parking";
import { itemSizes, SIZE_FACTOR } from "./constants";
import EditorContextMenu from "./components/EditorContextMenu";

const ParkingEditorPage = () => {
  const [items, setItems] = useState<EditorItem[]>([
    {
      category: "space",
      id: Math.random().toString(36).slice(2),
      spaceType: "standard",
    },
    {
      category: "space",
      id: Math.random().toString(36).slice(2),
      spaceType: "standard",
    },
    {
      category: "space",
      id: Math.random().toString(36).slice(2),
      spaceType: "standard",
    },
    { category: "exit", id: Math.random().toString(36).slice(2) },
    { category: "entrance", id: Math.random().toString(36).slice(2) },
    { category: "office", id: Math.random().toString(36).slice(2) },
  ]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<{
    item: EditorItem;
    clickPosition: Position;
  } | null>(null);
  const [collidingId, setCollidingId] = useState<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    setSelectedItem(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;

    setItems((prev) => {
      return prev.map((item) =>
        item.id === active.id
          ? {
              ...item,
              position: {
                // Y is the axis pointing out of the screen for Three.js
                x: (item.position?.x || 0) + delta.x,
                y: 0,
                z: (item.position?.z || 0) + delta.y,
              },
            }
          : item,
      );
    });

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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  function handleSave() {
    function _generateCompatibleDataForOtherObjects(
      items: EditorItem[],
      category: ParkingItemCategory,
    ) {
      return items
        .filter((item) => item.category === category)
        .map<OtherObject>((item) => ({
          id: item.id,
          position: item.position
            ? {
                x: item?.position?.x / SIZE_FACTOR,
                y: 0,
                z: item?.position?.z / SIZE_FACTOR,
              }
            : { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: 0, z: 0 },
          color: itemSizes[category].color,
          args: [itemSizes[category].height, 0.1, itemSizes[category].width],
        }));
    }

    const org: Organization = {
      name: "Saphal Parking Pvt. Ltd.",
      lots: [
        {
          floors: [
            {
              floorPrefix: "A",
              spaces: items
                .filter((item) => item.category === "space")
                .map<ParkingSpace>((item) => ({
                  ...item,
                  type: "standard",
                  position: item.position
                    ? {
                        x: item?.position?.x / 20,
                        y: 0,
                        z: item?.position?.z / 20,
                      }
                    : { x: 0, y: 0, z: 0 },
                  rotation: { x: 0, y: 0, z: 0 },
                  occupied: false,
                })),
              entrances: _generateCompatibleDataForOtherObjects(
                items,
                "entrance",
              ),
              exits: _generateCompatibleDataForOtherObjects(items, "exit"),
              offices: _generateCompatibleDataForOtherObjects(items, "office"),
            },
          ],
        },
      ],
    };

    console.log(org.lots[0].floors);
    // TODO: Save to database and/or LocalStorage
  }

  return (
    <div className="relative flex h-screen w-screen items-center overflow-hidden">
      <EditorSidebar onSave={handleSave} />
      <BackgroundGrid gridSize={gridSize} />
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragMove={handleDragMove}
        collisionDetection={rectIntersection}
        modifiers={[gridSnapModifier, restrictToParentElement]}
        sensors={sensors}
      >
        <div onClick={(e) => {
          if ( e.currentTarget === e.target ) 
            setSelectedItem(null);
          
        }} className="relative ms-20 h-full w-[calc(100%-5rem)] bg-transparent p-4">
          {selectedItem && (
            <EditorContextMenu
              selectedItem={selectedItem}
              items={items}
              setItems={setItems}
            />
          )}
          {items.map((item) => (
            <DraggableItem
              key={item.id}
              item={item}
              position={
                items.filter((currentItem) => currentItem.id === item.id)[0]
                  ?.position || { x: 0, z: 0 }
              }
              isColliding={item.id === collidingId}
              hide={item.id === activeId}
              onClick={(event) => {
                if (selectedItem && selectedItem.item.id === item.id) {
                  setSelectedItem(null);
                  return;
                }

                setSelectedItem({
                  item,
                  clickPosition: {
                    x: event.screenX,
                    z: event.screenY,
                  },
                });
              }}
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

export default ParkingEditorPage;

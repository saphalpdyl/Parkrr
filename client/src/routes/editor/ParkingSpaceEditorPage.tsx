import { useEffect } from "react";
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
import type { EditorItem, ParkingItemCategory } from "./types";
import DraggableItem from "./components/DraggableItem";
import EditorSidebar from "./components/EditorSidebar";
import BackgroundGrid from "./components/BackgroundGrid";
import { Organization, OtherObject, ParkingSpace } from "../../types/parking";
import { itemSizes, SIZE_FACTOR } from "./constants";
import EditorContextMenu from "./components/EditorContextMenu";
import OriginItem from "./components/OriginItem";
import Logo from "../../components/Logo";
import { useEditorStore } from "../../stores/editorState";
import { useOrigin } from "../../hooks/useOrigin";

const ParkingEditorPage = () => {
  const {
    items,
    activeId,
    selectedItem,
    collidingId,
    originPosition,
    setItems,
    deleteAllItems,
    updateItemPosition,
    setActiveId,
    setSelectedItem,
    setCollidingId,
    setOriginPosition,
  } = useEditorStore();

  const {handleCenterOrigin, dndContextRef} = useOrigin();


  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    setSelectedItem(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
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
                x: ((item?.position?.x - (originPosition?.x ?? 0)) / SIZE_FACTOR) + (itemSizes[category].width / 2),
                y: 0,
                z: (item?.position?.z - (originPosition?.z ?? 0)) / SIZE_FACTOR + (itemSizes[category].height / 2),
              }
            : { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: 0, z: 0 },
          color: itemSizes[category].color,
          args: [itemSizes[category].width, 0.1, itemSizes[category].height],
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
                        x: ((item?.position?.x - (originPosition?.x ?? 0)) / SIZE_FACTOR) + (itemSizes["space"].width / 2),
                        y: 0,
                        z: ((item?.position?.z - (originPosition?.z ?? 0)) / SIZE_FACTOR) + (itemSizes["space"].height / 2),
                      }
                    : { x: 0, y: 0, z: 0 },
                  rotation: { x: 0, y: 0, z: 0 },
                  occupied: false,
                  args: [itemSizes["space"].width, 0.1, itemSizes["space"].height],
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
  
  useEffect(() => {
   handleCenterOrigin(); 
  }, []);

  function handleClearCanvas() {
    deleteAllItems();
  }

  // TODO: Migrate to zustand as the state management solution

  return (
    <div className="relative flex h-screen w-screen items-center overflow-hidden">
      <EditorSidebar onSave={handleSave} onCenterOrigin={handleCenterOrigin} onClearCanvas={handleClearCanvas} />
      <BackgroundGrid gridSize={gridSize} />

      {/* Parkrr logo on the top right */}
      <div className="absolute top-3 left-3 z-40 opacity-70">
        <Logo />
      </div>
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragMove={handleDragMove}
        collisionDetection={rectIntersection}
        modifiers={[gridSnapModifier, restrictToParentElement]}
        sensors={sensors}
      >
        <div 
          ref={dndContextRef}
          onClick={(e) => {
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
          {
            originPosition && <OriginItem position={originPosition} />
          }
          {Array.isArray(items) && items.map((item) => (
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

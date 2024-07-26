import { useEffect } from "react";
import { DndContext, DragOverlay, rectIntersection } from "@dnd-kit/core";

import { restrictToParentElement } from "@dnd-kit/modifiers";
import DraggableItem from "./components/DraggableItem";
import EditorSidebar from "./components/EditorSidebar";
import BackgroundGrid from "./components/BackgroundGrid";
import { SIZE_FACTOR } from "./constants";
import EditorContextMenu from "./components/EditorContextMenu";
import OriginItem from "./components/OriginItem";
import Logo from "../../components/Logo";
import { useEditorStore } from "@/stores/editorStore.ts";
import { useOrigin } from "./hooks/useOrigin";
import { useDragDrop } from "./hooks/useDragDrop";
import EditorAddBar from "./components/EditorAddbar";
import SelectedItemPropertiesSection from "./components/SelectedItemPropertiesSection";
import { useClipboard } from "./hooks/useClipboard";
import useEditor from "../../hooks/useEditor";
import EditorSelect from "./components/EditorSelect";
import EditorNameBar from "./components/EditorNameBar";
import SwitchToRenderer from "@/routes/editor/components/SwitchToRenderer.tsx";
import useGlobalStore from "@/stores/globalStore.ts";
import useAuth from "@/hooks/useAuth.ts";

const ParkingEditorPage = () => {
  const {
    items,
    activeId,
    selectedItem,
    collidingId,
    originPosition,
    setSelectedItem,
  } = useEditorStore();

  const { handleCenterOrigin, dndContextRef } = useOrigin();
  const {
    handleDragEnd,
    handleDragMove,
    handleDragStart,
    gridSnapModifier,
    sensors,
  } = useDragDrop();

  const { copyItem, pasteItem } = useClipboard();
  const { handleSave, loadEditor, currentEditorId, currentEditor } = useEditor();
  const { startEditorLoading, stopEditorLoading } = useGlobalStore();
  const { token, user } = useAuth();

  useEffect(() => {
    handleCenterOrigin();
  }, []);

  useEffect(() => {
    if ( currentEditorId && user ) {
      loadEditor();
    }
  }, [currentEditorId]);

  useEffect(() => {
    if ( !token ) return;
  }, [currentEditorId, token]);

  useEffect(() => {
    if ( !currentEditor ) startEditorLoading();
    else stopEditorLoading();
  }, [currentEditor]);

  return (
    <div onCopy={copyItem} onPaste={pasteItem} className="relative flex h-screen w-screen items-center justify-center overflow-hidden">
      {
        !currentEditorId && <EditorSelect />
      }
      
      <span className="absolute right-2 top-2 z-20 font-mono text-xs font-semibold">
        Created with ❤️ by saphalpdyl
      </span>
      <BackgroundGrid gridSize={SIZE_FACTOR} />
      <EditorSidebar onSave={handleSave} onCenterOrigin={handleCenterOrigin} />
      <EditorAddBar />
      <EditorNameBar />
      <SelectedItemPropertiesSection isHidden={selectedItem === null} />
      <SwitchToRenderer />

      {/* Parkrr logo on the top right */}
      <div className="absolute left-3 top-3 z-40 opacity-70">
        <Logo />
      </div>
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={(event) =>
          handleDragEnd(event, originPosition ?? { x: 0, z: 0 })
        }
        onDragMove={handleDragMove}
        collisionDetection={rectIntersection}
        modifiers={[gridSnapModifier, restrictToParentElement]}
        sensors={sensors}
      >
        <div
          ref={dndContextRef}
          onClick={(e) => {
            if (e.currentTarget === e.target) setSelectedItem(null);
          }}
          className="relative ms-20 h-full w-[calc(100%-5rem)] bg-transparent p-4"
        >
          {selectedItem && <EditorContextMenu />}
          {originPosition && <OriginItem position={originPosition} />}
          {Array.isArray(items) &&
            items.map((item) => (
              <DraggableItem
                key={item.id}
                item={item}
                position={
                  items.filter((currentItem) => currentItem.id === item.id)[0]
                    ?.position || { x: 0, z: 0 }
                }
                isColliding={item.id === collidingId}
                isSelected={item.id === selectedItem?.item.id}
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
              <div className="h-full w-full rounded-md border-2 border-[#3b82f6] p-2 text-white shadow-sm"></div>
            ) : null}
          </DragOverlay>
        </div>
      </DndContext>
    </div>
  );
};

export default ParkingEditorPage;

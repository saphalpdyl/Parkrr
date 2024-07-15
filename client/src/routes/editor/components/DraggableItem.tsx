import type { EditorItem, Position } from "../types";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { itemSizes, SIZE_FACTOR } from "../constants";

export interface DraggableItemProps {
  item: EditorItem;
  position: Position;
  isColliding: boolean;
  hide ?: boolean;
  onClick(event: React.MouseEvent<HTMLElement>) : void;
}

const DraggableItem: React.FC<DraggableItemProps> = ({
  item,
  position,
  isColliding,
  hide = false,
  onClick,
}) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: item.id,
  });

  const { setNodeRef: setDroppableRef } = useDroppable({
    id: item.id,
  });

  const ref = (node: HTMLElement | null) => {
    setNodeRef(node);
    setDroppableRef(node);
  };

  const height = `${itemSizes[item.category].height * SIZE_FACTOR}px`;
  const width = `${itemSizes[item.category].width * SIZE_FACTOR}px`;
  
  const isVerticallyRotated = Math.abs(item.rotation ?? 0) === 90 || Math.abs(item.rotation ?? 0) === 270;
  
  return (
    <div
      onClick={onClick}
      ref={ref}
      className={`absolute ${isColliding ? "bg-green-500/40" : ""} cursor-move rounded-md p-2 shadow-md transition-colors ${hide ? "opacity-0" : "opacity-100"} z-20 flex items-center justify-center text-xs font-semibold capitalize ${item.category === "office" ? "border-2 border-dashed border-gray-500 shadow-none" : ""} select-none `}
      style={{
        left: position.x,
        top: position.z,
        height: isVerticallyRotated ? width : height,
        width: isVerticallyRotated ? height : width,
        backgroundColor: itemSizes[item.category].color,
      }}
      {...listeners}
      {...attributes}
    >
      <div 
        style={{
          transform: `rotateZ(${item.rotation ?? 0}deg)`,
        }}
        className="w-full h-full flex items-center justify-center">
        {item.category === "space" ? item.spaceType : item.category}
      </div>
    </div>
  );
};

export default DraggableItem;

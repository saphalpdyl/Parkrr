import { useDraggable, useDroppable } from "@dnd-kit/core";
import { twMerge } from "tailwind-merge";

import type { EditorItem, Position } from "../types";
import { itemSizes, SIZE_FACTOR } from "../constants";
import { parkingSpacesProperties} from "@/constants";
import { selectMatchingContrastColor } from "@/utils";

export interface DraggableItemProps {
  item: EditorItem;
  position: Position;
  isColliding: boolean;
  isSelected: boolean;
  hide ?: boolean;
  onClick(event: React.MouseEvent<HTMLElement>) : void;
}

const DraggableItem: React.FC<DraggableItemProps> = ({
  item,
  position,
  isColliding,
  hide = false,
  isSelected,
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
  const backgroundColor = item.category === "space" ? parkingSpacesProperties.find(space => space.spaceType === item.spaceType)!.color : itemSizes[item.category].color;
  
  return (
    <div
      onClick={onClick}
      ref={ref}
      className={twMerge(
        `absolute ${isColliding ? "bg-green-500/40" : ""} cursor-move rounded-md p-2 shadow-md transition-colors ${hide ? "opacity-0" : "opacity-100"} z-20 flex items-center justify-center text-xs font-semibold capitalize ${item.category === "office" ? "border-2 border-dashed border-gray-500 shadow-none" : ""}`,
        isSelected ? "border-[#3b82f6] border-2" : ""
      )}
      style={{
        left: position.x,
        top: position.z,
        height: isVerticallyRotated ? width : height,
        width: isVerticallyRotated ? height : width,
        backgroundColor,
        color: selectMatchingContrastColor(backgroundColor) as typeof backgroundColor,
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

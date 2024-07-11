import type { DraggableItemProps } from "../types";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { itemSizes, SIZE_FACTOR } from "../constants";

const DraggableItem: React.FC<DraggableItemProps> = ({
  item,
  position,
  isColliding,
  hide = false,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
  });

  const { setNodeRef: setDroppableRef } = useDroppable({
    id: item.id,
  });

  const ref = (node: HTMLElement | null) => {
    setNodeRef(node);
    setDroppableRef(node);
  };

  return (
    <div
      ref={ref}
      className={`absolute ${isColliding ? "bg-green-500/40" : "" } cursor-move rounded-md p-2 shadow-md transition-colors ${hide ? "opacity-0" : "opacity-100"} z-20 flex items-center justify-center capitalize font-semibold text-xs ${item.category === "office" ? "border-2 border-gray-500 border-dashed shadow-none" : "" } `}
      style={{
        transform: CSS.Translate.toString(transform),
        left: position.x,
        top: position.z,
        height: `${itemSizes[item.category].height * SIZE_FACTOR}px`,
        width: `${itemSizes[item.category].width * SIZE_FACTOR}px`,
        backgroundColor: itemSizes[item.category].color,
      }}
      {...listeners}
      {...attributes}
    >
      {item.category === "space" ? item.spaceType : item.category}
    </div>
  );
};

export default DraggableItem;

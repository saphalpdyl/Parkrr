import type { DraggableItemProps } from "../types";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

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
      className={`absolute ${isColliding ? "bg-green-500/40" : "bg-white"} cursor-move rounded-md p-2 shadow-md transition-colors ${hide ? "opacity-0" : "opacity-100"} z-20`}
      style={{
        transform: CSS.Translate.toString(transform),
        left: position.x,
        top: position.y,
      }}
      {...listeners}
      {...attributes}
    >
      {item.category === "space" ? item.spaceType : item.category}
    </div>
  );
};

export default DraggableItem;

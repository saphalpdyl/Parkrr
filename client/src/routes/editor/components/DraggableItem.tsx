import { CSSProperties } from "react";
import { DraggableItemProps } from "../types";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const DraggableItem: React.FC<DraggableItemProps> = ({ item, position, isColliding, hide = false }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
  });

  const { setNodeRef: setDroppableRef } = useDroppable({
    id: item.id,
  });

  const style : CSSProperties = {
    transform: CSS.Translate.toString(transform),
    left: position.x,
    top: position.y,
    position: 'absolute' as 'absolute',
    backgroundColor: isColliding ? 'lightgreen' : 'white',
    padding: '0.5rem',
    borderRadius: '0.25rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    cursor: 'move',
    transition: 'background-color 0.3s ease',
    opacity: hide ? "0" : "1",
  };

  const ref = (node: HTMLElement | null) => {
    setNodeRef(node);
    setDroppableRef(node);
  };

  return (
    <div
      ref={ref}
      style={style}
      {...listeners}
      {...attributes}
    >
      {item.content}
    </div>
  );
};

export default DraggableItem;
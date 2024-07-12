import { useDraggable, useDroppable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities";
import { Position } from "../types";

interface OriginItemProps {
  position: Position;
}

const OriginItem = ({ position }: OriginItemProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "origin",
  });

  const { setNodeRef: setDroppableRef } = useDroppable({
    id: "origin",
  });

  const ref = (node: HTMLElement | null) => {
    setNodeRef(node);
    setDroppableRef(node);
  };
  
  return (
    <div
      ref={ref}
      style={{
        transform: CSS.Translate.toString(transform),
        left: position.x,
        top: position.z,
      }}
      {...listeners}
      {...attributes}
      className="absolute h-5 w-5 rounded-full bg-transparent border-2 border-gray-600 border-dotted zmx-auto flex items-center justify-center z-20 cursor-grab"
    >
      <div className="h-[200%] absolute w-[2px] bg-slate-300 z-10 rounded-full"></div>
      <div className="w-[200%] absolute h-[2px] bg-slate-300 z-10 rounded-full"></div>
    </div>
  );
}
export default OriginItem
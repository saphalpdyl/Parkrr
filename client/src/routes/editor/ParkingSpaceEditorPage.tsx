import React, { CSSProperties, useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  useDraggable,
  useDroppable,
  DragOverlay,
  defaultDropAnimationSideEffects,
  rectIntersection,
} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { createSnapModifier } from '@dnd-kit/modifiers'

interface Item {
  id: string;
  content: string;
}

interface Position {
  x: number;
  y: number;
}

const DragAndDropPage: React.FC = () => {
  const [items] = useState<Item[]>([
    { id: '1', content: 'Item 1' },
    { id: '2', content: 'Item 2' },
    { id: '3', content: 'Item 3' },
  ]);
  const [positions, setPositions] = useState<Record<string, Position>>({});
  const [activeId, setActiveId] = useState<string | null>(null);
  const [collidingId, setCollidingId] = useState<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta, collisions } = event;
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
    <DndContext 
      onDragStart={handleDragStart} 
      onDragEnd={handleDragEnd}
      onDragMove={handleDragMove}
      collisionDetection={rectIntersection}
      modifiers={[gridSnapModifier]}
    >
      <div style={{ height: '100vh', width: '100vw', padding: '1rem', backgroundColor: '#f0f0f0', position: 'relative' }}>
        <div
          className='h-screen w-screen absolute top-0 left-0'
        >
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width={gridSize} height={gridSize} patternUnits="userSpaceOnUse">
                <path d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`} fill="none" stroke="#6662" stroke-width="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        {items.map((item) => (
          <DraggableItem 
            key={item.id} 
            item={item} 
            position={positions[item.id] || { x: 0, y: 0 }}
            isColliding={item.id === collidingId}
            hide={item.id === activeId}
          />
        ))}
        <DragOverlay dropAnimation={{
          sideEffects: defaultDropAnimationSideEffects({
            styles: {
              active: {
                opacity: '0.5',
              },
            },
          }),
        }}>
          {activeId ? (
            <div 
              className='h-full'
              style={{ border: '3px solid #3b82f6', color: 'white', padding: '0.5rem', borderRadius: '0.25rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

interface DraggableItemProps {
  item: Item;
  position: Position;
  isColliding: boolean;
  hide ?: boolean;
}

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

export default DragAndDropPage;
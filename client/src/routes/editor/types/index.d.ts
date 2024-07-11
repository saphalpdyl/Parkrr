export interface Item {
  id: string;
  content: string;
}

export interface Position {
  x: number;
  y: number;
}

export interface DraggableItemProps {
  item: Item;
  position: Position;
  isColliding: boolean;
  hide ?: boolean;
}
import type { ParkingSpaceType, WorldObject } from "../../../types/parking";

export type ParkingItemCategory = "entrance" | "exit" | "space" | "office";

export type EditorItem = Partial<WorldObject> & {
  id: string;
  category: ParkingItemCategory;
} & (
  | { category: "entrance" | "exit" | "office" }
  | { category: "space"; spaceType: ParkingSpaceType }
);

export interface Position {
  x: number;
  y: number;
}

export interface DraggableItemProps {
  item: EditorItem;
  position: Position;
  isColliding: boolean;
  hide ?: boolean;
}
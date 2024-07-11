import type { ParkingSpaceType, WorldObject } from "../../../types/parking";

export interface ItemSize {
  height: number;
  width: number;
  color: string;
}

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
  z: number;
}

export interface DraggableItemProps {
  item: EditorItem;
  position: Position;
  isColliding: boolean;
  hide ?: boolean;
}
import { OtherObject } from "../../../types/parking";
import { EditorItem } from "../types";

export function tryParseJSON(text: string) : unknown | null {
  try {
    return JSON.parse(text);
  } catch(_) {
    return null;
  }
}

export function copyItemToClipboard(item: EditorItem | OtherObject) {
  const itemInText = JSON.stringify({
    ...item,
  });

  navigator.clipboard.writeText(itemInText);
}

export async function tryGetItemFromClipboard() {
  const clipboardData = await navigator.clipboard.readText();
  const parsedClipboardData = tryParseJSON(clipboardData);

  if (!parsedClipboardData) return;

  return parsedClipboardData as EditorItem;
}
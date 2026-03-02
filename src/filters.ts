import type { Item } from "@owlbear-rodeo/sdk";

/**
 * Layers to exclude from export. These are either system-managed,
 * ephemeral, or represent the base map image itself.
 */
const EXCLUDED_LAYERS = new Set([
  "MAP",          // Base map images
  "GRID",         // Grid overlays
  "FOG",          // Fog of war (managed by Smoke & Spectre or built-in)
  "POINTER",      // Ephemeral pointer indicators
  "RULER",        // Ephemeral ruler measurements
  "POST_PROCESS", // Visual effect layers
  "CONTROL",      // Extension UI controls
  "POPOVER",      // Extension popovers
]);

/**
 * Returns true if the item is user-placed content worth backing up.
 * Includes annotations (shapes, curves, text), tokens (images on
 * CHARACTER/PROP/MOUNT layers), and anything else on user-facing layers.
 * Excludes the base map, fog, grid, ephemeral/system items, and
 * empty text items left behind by clicking the text tool without typing.
 */
export function isAnnotation(item: Item): boolean {
  if (EXCLUDED_LAYERS.has(item.layer)) return false;
  if (item.type === "TEXT" && isEmptyText(item)) return false;
  return true;
}

/**
 * Checks if a TEXT item has no actual text content.
 * OBR uses Slate rich text nodes — we recursively extract all text
 * and check if it's all whitespace. The plainText field is unreliable
 * (it's often empty even when richText has content).
 */
function isEmptyText(item: Item): boolean {
  const textItem = item as Item & { text?: { richText?: unknown[] } };
  const richText = textItem.text?.richText;
  if (!richText) return true;
  return extractText(richText).trim().length === 0;
}

function extractText(nodes: unknown[]): string {
  let result = "";
  for (const node of nodes) {
    if (node && typeof node === "object") {
      const n = node as Record<string, unknown>;
      if (typeof n.text === "string") {
        result += n.text;
      }
      if (Array.isArray(n.children)) {
        result += extractText(n.children);
      }
    }
  }
  return result;
}

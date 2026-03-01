import type { Item } from "@owlbear-rodeo/sdk";

/** Item types that represent user-drawn annotations (self-contained vector data) */
const ANNOTATION_TYPES = new Set([
  "SHAPE",
  "CURVE",
  "LINE",
  "TEXT",
  "LABEL",
  "PATH",
]);

/**
 * Returns true if the item is an annotation type (shape, curve, line, text, label, or path).
 * Excludes images (map/tokens, reference CDN URLs), walls (fog extension managed),
 * pointers/rulers (ephemeral), and effects/lights/billboards.
 */
export function isAnnotation(item: Item): boolean {
  return ANNOTATION_TYPES.has(item.type);
}

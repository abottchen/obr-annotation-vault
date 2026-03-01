import type { Item, GridType, GridScale, Metadata } from "@owlbear-rodeo/sdk";

export interface AnnotationVaultExport {
  /** Schema version for forward compatibility */
  version: 1;
  /** ISO 8601 timestamp of export */
  exportedAt: string;
  /** Name of the player who exported */
  exportedBy: string;
  /** Scene context at time of export */
  scene: {
    metadata: Metadata;
    grid: {
      dpi: number;
      scale: GridScale;
      type: GridType;
    };
  };
  /** Summary counts for quick inspection */
  summary: {
    totalItems: number;
    byType: Record<string, number>;
    byLayer: Record<string, number>;
  };
  /** The actual annotation items */
  items: Item[];
}

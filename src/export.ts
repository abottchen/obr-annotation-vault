import OBR from "@owlbear-rodeo/sdk";
import type { Item } from "@owlbear-rodeo/sdk";
import { isAnnotation } from "./filters";
import type { AnnotationVaultExport } from "./types";
import { setStatus } from "./ui";

export async function handleExport(): Promise<void> {
  try {
    setStatus("Exporting...", "info");

    const allItems = await OBR.scene.items.getItems();
    const annotations = allItems.filter(isAnnotation);

    if (annotations.length === 0) {
      setStatus("No annotations found in scene.", "warning");
      return;
    }

    const [sceneMetadata, dpi, scale, gridType, playerName] = await Promise.all(
      [
        OBR.scene.getMetadata(),
        OBR.scene.grid.getDpi(),
        OBR.scene.grid.getScale(),
        OBR.scene.grid.getType(),
        OBR.player.getName(),
      ]
    );

    const exportData: AnnotationVaultExport = {
      version: 1,
      exportedAt: new Date().toISOString(),
      exportedBy: playerName,
      scene: {
        metadata: sceneMetadata,
        grid: { dpi, scale, type: gridType },
      },
      summary: {
        totalItems: annotations.length,
        byType: countBy(annotations, (i) => i.type),
        byLayer: countBy(annotations, (i) => i.layer),
      },
      items: annotations,
    };

    const json = JSON.stringify(exportData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const now = new Date();
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const filename = `annotations-${timestamp}.json`;

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);

    setStatus(`Exported ${annotations.length} annotations.`, "success");
    await OBR.notification.show(
      `Annotation Vault: Exported ${annotations.length} items`,
      "SUCCESS"
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    setStatus(`Export failed: ${msg}`, "error");
    await OBR.notification.show("Annotation Vault: Export failed", "ERROR");
  }
}

function countBy(items: Item[], key: (item: Item) => string): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const item of items) {
    const k = key(item);
    counts[k] = (counts[k] || 0) + 1;
  }
  return counts;
}

import OBR from "@owlbear-rodeo/sdk";
import type { Item } from "@owlbear-rodeo/sdk";
import type { AnnotationVaultExport } from "./types";
import { setStatus } from "./ui";

export async function handleImport(event: Event): Promise<void> {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  try {
    setStatus("Reading file...", "info");
    const text = await file.text();
    const data: AnnotationVaultExport = JSON.parse(text);

    if (!data.version || !data.items || !Array.isArray(data.items)) {
      throw new Error(
        "Invalid Annotation Vault file: missing version or items array"
      );
    }
    if (data.version !== 1) {
      throw new Error(
        `Unsupported file version: ${data.version}. This extension supports version 1.`
      );
    }
    if (data.items.length === 0) {
      setStatus("File contains no items.", "warning");
      return;
    }

    // Generate new IDs to prevent collisions with existing scene items.
    // Strip readonly server-managed fields that OBR will reassign on creation.
    const processedItems = data.items.map((item) => {
      const {
        lastModified: _lm,
        lastModifiedUserId: _lmu,
        ...rest
      } = item as Item & { lastModified?: string; lastModifiedUserId?: string };
      return {
        ...rest,
        id: crypto.randomUUID(),
      } as Item;
    });

    setStatus(`Importing ${processedItems.length} items...`, "info");
    await OBR.scene.items.addItems(processedItems);

    setStatus(`Imported ${processedItems.length} annotations.`, "success");
    await OBR.notification.show(
      `Annotation Vault: Imported ${processedItems.length} items`,
      "SUCCESS"
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    setStatus(`Import failed: ${msg}`, "error");
    await OBR.notification.show("Annotation Vault: Import failed", "ERROR");
  } finally {
    // Reset so the same file can be re-imported
    input.value = "";
  }
}

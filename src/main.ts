import OBR from "@owlbear-rodeo/sdk";
import { handleExport } from "./export";
import { handleImport } from "./import";
import { renderUI } from "./ui";

OBR.onReady(async () => {
  const app = document.getElementById("app");
  if (!app) return;

  renderUI(app);

  document.getElementById("export-btn")!.addEventListener("click", handleExport);

  document.getElementById("import-btn")!.addEventListener("click", () => {
    document.getElementById("file-input")!.click();
  });

  document.getElementById("file-input")!.addEventListener("change", handleImport);
});

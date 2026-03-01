import { STYLES } from "./styles";

export function renderUI(container: HTMLElement): void {
  const style = document.createElement("style");
  style.textContent = STYLES;
  document.head.appendChild(style);

  container.innerHTML = `
    <div class="vault-container">
      <h2>Annotation Vault</h2>
      <p class="description">Export and import scene annotations as JSON files for backup and version control.</p>

      <div class="section">
        <button id="export-btn" class="btn btn-primary">Export Annotations</button>
        <p class="hint">Downloads all drawings, shapes, text, and labels as a JSON file.</p>
      </div>

      <hr />

      <div class="section">
        <button id="import-btn" class="btn btn-secondary">Import Annotations</button>
        <input type="file" id="file-input" accept=".json" hidden />
        <p class="hint">Upload a previously exported JSON file to restore annotations.</p>
      </div>

      <div id="status" class="status"></div>
    </div>
  `;
}

export type StatusLevel = "info" | "success" | "warning" | "error";

export function setStatus(message: string, level: StatusLevel): void {
  const el = document.getElementById("status");
  if (el) {
    el.textContent = message;
    el.className = `status status-${level}`;
  }
}

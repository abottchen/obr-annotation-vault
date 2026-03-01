# Annotation Vault

An [Owlbear Rodeo](https://www.owlbear.rodeo/) extension that exports and imports scene annotations as JSON files for backup and version control.

Owlbear Rodeo has no version history or automatic backups. If annotations are accidentally deleted or lost, there's no way to recover them. Annotation Vault solves this by letting you download all drawings, shapes, text, and labels as a JSON file that you can store locally, commit to git, or share with others.

## Install

Paste this URL into your Owlbear Rodeo room's extension settings:

```
https://abottchen.github.io/obr-annotation-vault/manifest.json
```

## Usage

Click the **Annotation Vault** button in the top-left action menu to open the popover.

### Export

Click **Export Annotations** to download a JSON file containing all annotation items in the current scene. The file includes:

- All drawings, shapes, lines, text, labels, and paths
- Scene grid configuration (DPI, scale, grid type) for reference
- Summary counts by item type and layer

The file is named `annotations-YYYY-MM-DD.json` and is human-readable.

### Import

Click **Import Annotations** and select a previously exported JSON file. All items are restored to the scene with new IDs to avoid conflicts with existing items.

## What gets exported

| Exported | Not exported |
|----------|-------------|
| Shapes (rectangles, circles, hexagons) | Map images |
| Curves (freeform drawings) | Tokens |
| Lines | Fog of war walls |
| Text | Pointers / rulers |
| Labels | Lights / effects |
| Paths | |

Annotations are self-contained vector data. Map images and tokens reference Owlbear's asset CDN and are managed separately through Owlbear's built-in storage system.

## Development

```bash
npm install
npm run dev
```

This starts a Vite dev server at `http://localhost:5173`. Add `http://localhost:5173/manifest.json` as an extension in your Owlbear Rodeo room to test.

## Build

```bash
npm run build
```

Output goes to `dist/`. Deploy the contents to any HTTPS-capable static host (GitHub Pages, Netlify, etc.).

## Tech

- [Owlbear Rodeo SDK](https://docs.owlbear.rodeo/extensions/) v3.x
- TypeScript
- Vite

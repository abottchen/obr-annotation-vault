export const STYLES = `
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background: #222639;
    color: #e0e0e0;
    font-size: 14px;
    line-height: 1.5;
  }

  .vault-container {
    padding: 16px;
  }

  h2 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 8px;
    color: #f0f0f0;
  }

  .description {
    font-size: 12px;
    color: #999;
    margin-bottom: 16px;
  }

  .section {
    margin-bottom: 12px;
  }

  .btn {
    display: block;
    width: 100%;
    padding: 10px 16px;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s, opacity 0.15s;
  }

  .btn:hover {
    opacity: 0.9;
  }

  .btn:active {
    opacity: 0.8;
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .btn-primary {
    background: #bb86fc;
    color: #1a1a2e;
  }

  .btn-secondary {
    background: #444;
    color: #e0e0e0;
  }

  .hint {
    font-size: 11px;
    color: #777;
    margin-top: 6px;
  }

  hr {
    border: none;
    border-top: 1px solid #333;
    margin: 16px 0;
  }

  .status {
    margin-top: 16px;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 12px;
    min-height: 20px;
  }

  .status:empty {
    display: none;
  }

  .status-info {
    background: #1a3a5c;
    color: #7cb3e0;
  }

  .status-success {
    background: #1a3c1a;
    color: #7ce07c;
  }

  .status-warning {
    background: #3c3a1a;
    color: #e0d07c;
  }

  .status-error {
    background: #3c1a1a;
    color: #e07c7c;
  }
`;

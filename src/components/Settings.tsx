import { useState } from "react";
import { useLang } from "../LangContext";

const STORAGE_KEY = "openclaw_api_url";
export const DEFAULT_API_URL = "http://localhost:3001";

export function getApiUrl(): string {
  return localStorage.getItem(STORAGE_KEY) ?? DEFAULT_API_URL;
}

export function Settings() {
  const { t, lang } = useLang();
  const [url, setUrl]     = useState(getApiUrl);
  const [saved, setSaved] = useState(false);

  function save() {
    const trimmed = url.trim().replace(/\/$/, "");
    localStorage.setItem(STORAGE_KEY, trimmed);
    setUrl(trimmed);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function reset() {
    localStorage.removeItem(STORAGE_KEY);
    setUrl(DEFAULT_API_URL);
  }

  const commentLabel = lang === "zh" ? "// 可选，用于标记调用来源" : "// optional call label";

  return (
    <div className="settings">
      <section className="card">
        <h2>{t.settingsTitle}</h2>
        <p className="settings-desc" style={{ whiteSpace: "pre-line" }}>
          {t.settingsDesc}
        </p>

        <div className="settings-row">
          <label htmlFor="api-url">API URL</label>
          <div className="settings-input-group">
            <input
              id="api-url"
              type="text"
              value={url}
              onChange={(e) => { setUrl(e.target.value); setSaved(false); }}
              placeholder="http://localhost:3001"
              spellCheck={false}
            />
            <button className="btn-primary" onClick={save}>
              {saved ? t.saved : t.save}
            </button>
            <button className="btn-ghost" onClick={reset}>{t.reset}</button>
          </div>
        </div>

        <div className="settings-endpoints">
          <h3>{t.endpointsTitle}</h3>
          <table className="endpoint-table">
            <tbody>
              <tr>
                <td><code>POST {url}/api/log-tokens</code></td>
                <td>{t.epLogTokens}</td>
              </tr>
              <tr>
                <td><code>GET {url}/api/stream</code></td>
                <td>{t.epStream}</td>
              </tr>
              <tr>
                <td><code>GET {url}/api/history</code></td>
                <td>{t.epHistory}</td>
              </tr>
              <tr>
                <td><code>DELETE {url}/api/history</code></td>
                <td>{t.epClear}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <details className="integration-guide">
          <summary>{t.integrationTitle}</summary>
          <div className="guide-body">
            <pre>{`await fetch("${url}/api/log-tokens", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model:            "claude-sonnet-4-6",
    provider:         "anthropic",
    inputTokens:      usage.input_tokens,
    outputTokens:     usage.output_tokens,
    inputCostPer1M:   3.0,
    outputCostPer1M:  15.0,
    label:            "chat-reply",   ${commentLabel}
  }),
});`}</pre>
          </div>
        </details>
      </section>
    </div>
  );
}

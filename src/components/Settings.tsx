import { useState } from "react";

const STORAGE_KEY = "openclaw_api_url";
export const DEFAULT_API_URL = "http://localhost:3001";

export function getApiUrl(): string {
  return localStorage.getItem(STORAGE_KEY) ?? DEFAULT_API_URL;
}

export function Settings() {
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

  return (
    <div className="settings">
      <section className="card">
        <h2>OpenClaw 日志服务器</h2>
        <p className="settings-desc">
          配置 Token 日志 API 的地址。如果你在本机运行 OpenClaw，默认值即可。<br />
          如果你将 API 服务部署到了其他机器或云端，在此填写对应地址。
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
              {saved ? "已保存 ✓" : "保存"}
            </button>
            <button className="btn-ghost" onClick={reset}>重置</button>
          </div>
        </div>

        <div className="settings-endpoints">
          <h3>API 端点</h3>
          <table className="endpoint-table">
            <tbody>
              <tr>
                <td><code>POST {url}/api/log-tokens</code></td>
                <td>OpenClaw 上报 token 用量</td>
              </tr>
              <tr>
                <td><code>GET {url}/api/stream</code></td>
                <td>SSE 实时推送（前端订阅）</td>
              </tr>
              <tr>
                <td><code>GET {url}/api/history</code></td>
                <td>获取完整历史记录</td>
              </tr>
              <tr>
                <td><code>DELETE {url}/api/history</code></td>
                <td>清空历史记录</td>
              </tr>
            </tbody>
          </table>
        </div>

        <details className="integration-guide">
          <summary>OpenClaw 调用示例（复制到你的 skill/hook 中）</summary>
          <div className="guide-body">
            <pre>{`// 在每次 AI 调用后执行
await fetch("${url}/api/log-tokens", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model:            "claude-sonnet-4-6",
    provider:         "anthropic",
    inputTokens:      usage.input_tokens,
    outputTokens:     usage.output_tokens,
    inputCostPer1M:   3.0,
    outputCostPer1M:  15.0,
    label:            "chat-reply",   // 可选，用于标记调用来源
  }),
});`}</pre>
          </div>
        </details>
      </section>
    </div>
  );
}

import { useEffect, useState } from "react";
import { getApiUrl } from "./Settings";

interface TokenRecord {
  id: string;
  timestamp: number;
  model: string;
  provider: string;
  inputTokens: number;
  outputTokens: number;
  inputCost: number;
  outputCost: number;
  totalCost: number;
  label?: string;
}

interface Totals {
  records: TokenRecord[];
  totalInputTokens: number;
  totalOutputTokens: number;
  totalCost: number;
}

const API = getApiUrl();

function fmt(n: number) {
  return n.toLocaleString("en-US");
}

function fmtCost(usd: number) {
  if (usd < 0.01) return `$${usd.toFixed(6)}`;
  if (usd < 1) return `$${usd.toFixed(4)}`;
  return `$${usd.toFixed(2)}`;
}

function fmtTime(ts: number) {
  return new Date(ts).toLocaleTimeString("zh-CN", { hour12: false });
}

export function LiveMonitor() {
  const [connected, setConnected] = useState(false);
  const [totals, setTotals] = useState<Totals>({
    records: [],
    totalInputTokens: 0,
    totalOutputTokens: 0,
    totalCost: 0,
  });
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    let es: EventSource;
    let retry: ReturnType<typeof setTimeout>;

    function connect() {
      es = new EventSource(`${API}/api/stream`);

      es.addEventListener("init", (e) => {
        setTotals(JSON.parse(e.data));
        setConnected(true);
      });

      es.addEventListener("record", (e) => {
        const { totals: t } = JSON.parse(e.data) as { record: TokenRecord; totals: Totals };
        setTotals(t);
        setFlash(true);
        setTimeout(() => setFlash(false), 600);
      });

      es.addEventListener("clear", () => {
        setTotals({ records: [], totalInputTokens: 0, totalOutputTokens: 0, totalCost: 0 });
      });

      es.onerror = () => {
        setConnected(false);
        es.close();
        retry = setTimeout(connect, 3000);
      };
    }

    connect();
    return () => {
      clearTimeout(retry);
      es?.close();
    };
  }, []);

  async function handleClear() {
    await fetch(`${API}/api/history`, { method: "DELETE" });
  }

  return (
    <div className="live-monitor">
      {/* Status bar */}
      <div className="lm-header">
        <div className={`status-dot ${connected ? "online" : "offline"}`} />
        <span className="status-text">
          {connected ? "已连接 OpenClaw 日志服务" : "未连接（重试中…）"}
        </span>
        {totals.records.length > 0 && (
          <button className="clear-btn" onClick={handleClear}>
            清空
          </button>
        )}
      </div>

      {/* Summary cards */}
      <div className={`lm-stats ${flash ? "flash" : ""}`}>
        <div className="lm-stat">
          <div className="stat-label">累计输入</div>
          <div className="stat-value">{fmt(totals.totalInputTokens)}</div>
          <div className="stat-sub">tokens</div>
        </div>
        <div className="lm-stat">
          <div className="stat-label">累计输出</div>
          <div className="stat-value">{fmt(totals.totalOutputTokens)}</div>
          <div className="stat-sub">tokens</div>
        </div>
        <div className="lm-stat highlight">
          <div className="stat-label">累计费用</div>
          <div className="stat-value">{fmtCost(totals.totalCost)}</div>
          <div className="stat-sub">
            {fmt(totals.totalInputTokens + totals.totalOutputTokens)} total
          </div>
        </div>
        <div className="lm-stat">
          <div className="stat-label">调用次数</div>
          <div className="stat-value">{totals.records.length}</div>
          <div className="stat-sub">requests</div>
        </div>
      </div>

      {/* Call log */}
      {totals.records.length === 0 ? (
        <div className="lm-empty">
          <p>等待 OpenClaw 上报 token 用量…</p>
          <code className="api-hint">
            POST {API}/api/log-tokens
          </code>
        </div>
      ) : (
        <div className="lm-table-wrap">
          <table className="lm-table">
            <thead>
              <tr>
                <th>时间</th>
                <th>模型</th>
                <th>标签</th>
                <th>输入</th>
                <th>输出</th>
                <th>费用</th>
              </tr>
            </thead>
            <tbody>
              {totals.records.map((r) => (
                <tr key={r.id}>
                  <td className="mono">{fmtTime(r.timestamp)}</td>
                  <td>
                    <span className={`provider-tag ${r.provider}`}>
                      {r.model}
                    </span>
                  </td>
                  <td className="label-cell">{r.label ?? "—"}</td>
                  <td className="mono">{fmt(r.inputTokens)}</td>
                  <td className="mono">{fmt(r.outputTokens)}</td>
                  <td className="mono cost">{fmtCost(r.totalCost)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* OpenClaw integration guide */}
      <details className="integration-guide">
        <summary>如何在 OpenClaw 中配置调用？</summary>
        <div className="guide-body">
          <p>在你的 OpenClaw Workspace Skill 或工具回调中，每次 AI 调用后发送：</p>
          <pre>{`POST http://localhost:3001/api/log-tokens
Content-Type: application/json

{
  "model": "claude-sonnet-4-6",
  "provider": "anthropic",
  "inputTokens": 1234,
  "outputTokens": 567,
  "inputCostPer1M": 3.0,
  "outputCostPer1M": 15.0,
  "label": "chat-reply"
}`}</pre>
        </div>
      </details>
    </div>
  );
}

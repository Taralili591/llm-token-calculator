import { useEffect, useState } from "react";
import { getApiUrl } from "./Settings";
import { useLang } from "../LangContext";

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
  const { t } = useLang();
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
        const { totals: next } = JSON.parse(e.data) as { record: TokenRecord; totals: Totals };
        setTotals(next);
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
      <div className="lm-header">
        <div className={`status-dot ${connected ? "online" : "offline"}`} />
        <span className="status-text">
          {connected ? t.connected : t.disconnected}
        </span>
        {totals.records.length > 0 && (
          <button className="clear-btn" onClick={handleClear}>{t.clear}</button>
        )}
      </div>

      <div className={`lm-stats ${flash ? "flash" : ""}`}>
        <div className="lm-stat">
          <div className="stat-label">{t.totalInput}</div>
          <div className="stat-value">{fmt(totals.totalInputTokens)}</div>
          <div className="stat-sub">tokens</div>
        </div>
        <div className="lm-stat">
          <div className="stat-label">{t.totalOutput}</div>
          <div className="stat-value">{fmt(totals.totalOutputTokens)}</div>
          <div className="stat-sub">tokens</div>
        </div>
        <div className="lm-stat highlight">
          <div className="stat-label">{t.totalCost}</div>
          <div className="stat-value">{fmtCost(totals.totalCost)}</div>
          <div className="stat-sub">
            {fmt(totals.totalInputTokens + totals.totalOutputTokens)} total
          </div>
        </div>
        <div className="lm-stat">
          <div className="stat-label">{t.requests}</div>
          <div className="stat-value">{totals.records.length}</div>
          <div className="stat-sub">requests</div>
        </div>
      </div>

      {totals.records.length === 0 ? (
        <div className="lm-empty">
          <p>{t.waiting}</p>
          <code className="api-hint">POST {API}/api/log-tokens</code>
        </div>
      ) : (
        <div className="lm-table-wrap">
          <table className="lm-table">
            <thead>
              <tr>
                <th>{t.colTime}</th>
                <th>{t.colModel}</th>
                <th>{t.colLabel}</th>
                <th>{t.colInput}</th>
                <th>{t.colOutput}</th>
                <th>{t.colCost}</th>
              </tr>
            </thead>
            <tbody>
              {totals.records.map((r) => (
                <tr key={r.id}>
                  <td className="mono">{fmtTime(r.timestamp)}</td>
                  <td>
                    <span className={`provider-tag ${r.provider}`}>{r.model}</span>
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

      <details className="integration-guide">
        <summary>{t.guideTitle}</summary>
        <div className="guide-body">
          <p>{t.guideDesc}</p>
          <pre>{`POST ${API}/api/log-tokens
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

import express, { Request, Response } from "express";
import cors from "cors";
import { randomUUID } from "crypto";
import {
  addRecord,
  getStore,
  clearStore,
  type TokenUsageRecord,
} from "./store.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// SSE client registry
const sseClients = new Set<Response>();

function broadcast(event: string, data: unknown): void {
  const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  for (const client of sseClients) {
    client.write(payload);
  }
}

// ── SSE endpoint (frontend subscribes here) ──────────────────────────────────
app.get("/api/stream", (req: Request, res: Response) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  // Send current state on connect
  res.write(`event: init\ndata: ${JSON.stringify(getStore())}\n\n`);

  sseClients.add(res);
  req.on("close", () => sseClients.delete(res));
});

// ── Log token usage (OpenClaw calls this) ────────────────────────────────────
// POST /api/log-tokens
// Body: { model, provider?, inputTokens, outputTokens, inputCostPer1M?, outputCostPer1M?, label? }
app.post("/api/log-tokens", (req: Request, res: Response) => {
  const {
    model,
    provider = "unknown",
    inputTokens,
    outputTokens,
    inputCostPer1M = 0,
    outputCostPer1M = 0,
    label,
  } = req.body as {
    model: string;
    provider?: string;
    inputTokens: number;
    outputTokens: number;
    inputCostPer1M?: number;
    outputCostPer1M?: number;
    label?: string;
  };

  if (
    typeof model !== "string" ||
    typeof inputTokens !== "number" ||
    typeof outputTokens !== "number"
  ) {
    res.status(400).json({ error: "model, inputTokens, outputTokens required" });
    return;
  }

  const inputCost = (inputTokens / 1_000_000) * inputCostPer1M;
  const outputCost = (outputTokens / 1_000_000) * outputCostPer1M;

  const record: TokenUsageRecord = {
    id: randomUUID(),
    timestamp: Date.now(),
    model,
    provider,
    inputTokens,
    outputTokens,
    inputCost,
    outputCost,
    totalCost: inputCost + outputCost,
    label,
  };

  addRecord(record);
  broadcast("record", { record, totals: getStore() });

  res.json({ ok: true, id: record.id });
});

// ── Get full history ─────────────────────────────────────────────────────────
app.get("/api/history", (_req: Request, res: Response) => {
  res.json(getStore());
});

// ── Clear history ────────────────────────────────────────────────────────────
app.delete("/api/history", (_req: Request, res: Response) => {
  clearStore();
  broadcast("clear", {});
  res.json({ ok: true });
});

// ── Health check ─────────────────────────────────────────────────────────────
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ ok: true, clients: sseClients.size });
});

app.listen(PORT, () => {
  console.log(`Token Logger API running on http://localhost:${PORT}`);
  console.log(`  POST /api/log-tokens  — OpenClaw logs usage here`);
  console.log(`  GET  /api/stream      — SSE stream for frontend`);
  console.log(`  GET  /api/history     — full history`);
  console.log(`  DELETE /api/history   — clear history`);
});

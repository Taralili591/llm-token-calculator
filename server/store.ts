export interface TokenUsageRecord {
  id: string;
  timestamp: number;
  model: string;
  provider: "anthropic" | "openai" | string;
  inputTokens: number;
  outputTokens: number;
  inputCost: number;
  outputCost: number;
  totalCost: number;
  label?: string; // optional call label from OpenClaw
}

export interface UsageStore {
  records: TokenUsageRecord[];
  totalInputTokens: number;
  totalOutputTokens: number;
  totalCost: number;
}

const store: UsageStore = {
  records: [],
  totalInputTokens: 0,
  totalOutputTokens: 0,
  totalCost: 0,
};

export function addRecord(record: TokenUsageRecord): void {
  store.records.unshift(record); // newest first
  store.totalInputTokens += record.inputTokens;
  store.totalOutputTokens += record.outputTokens;
  store.totalCost += record.totalCost;
}

export function getStore(): UsageStore {
  return { ...store, records: [...store.records] };
}

export function clearStore(): void {
  store.records = [];
  store.totalInputTokens = 0;
  store.totalOutputTokens = 0;
  store.totalCost = 0;
}

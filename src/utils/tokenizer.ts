import { encode } from "gpt-tokenizer";

// Both Claude and GPT-4 use cl100k_base tokenizer, so gpt-tokenizer
// gives accurate counts for both providers.
export type TokenizerType = "claude" | "gpt";

export function countTokensForModel(
  text: string,
  _tokenizerType: TokenizerType
): number {
  if (!text) return 0;
  try {
    return encode(text).length;
  } catch {
    // Fallback: ~4 chars per token
    return Math.ceil(text.length / 4);
  }
}

export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

export function formatCost(usd: number): string {
  if (usd < 0.01) return `$${usd.toFixed(6)}`;
  if (usd < 1) return `$${usd.toFixed(4)}`;
  return `$${usd.toFixed(2)}`;
}

export function calcCost(tokens: number, pricePer1M: number): number {
  return (tokens / 1_000_000) * pricePer1M;
}

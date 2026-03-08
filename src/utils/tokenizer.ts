import { encode } from "gpt-tokenizer";

export type TokenizerType = "cl100k" | "approx";

export function countTokensForModel(text: string, tokenizerType: TokenizerType): number {
  if (!text) return 0;
  try {
    if (tokenizerType === "cl100k") {
      return encode(text).length;
    }
    // approx: ~4 chars per token (good enough for Gemini / Chinese models)
    return Math.ceil(text.length / 4);
  } catch {
    return Math.ceil(text.length / 4);
  }
}

export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

export function formatCost(usd: number): string {
  if (usd === 0) return "$0";
  if (usd < 0.01) return `$${usd.toFixed(6)}`;
  if (usd < 1) return `$${usd.toFixed(4)}`;
  return `$${usd.toFixed(2)}`;
}

export function calcCost(tokens: number, pricePer1M: number): number {
  return (tokens / 1_000_000) * pricePer1M;
}

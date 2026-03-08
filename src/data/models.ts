export interface ModelPricing {
  id: string;
  name: string;
  provider: "anthropic" | "openai";
  inputPricePer1M: number;  // USD per 1M tokens
  outputPricePer1M: number; // USD per 1M tokens
  contextWindow: number;
  tokenizer: "claude" | "gpt";
}

export const MODELS: ModelPricing[] = [
  // Anthropic Claude
  {
    id: "claude-opus-4-6",
    name: "Claude Opus 4.6",
    provider: "anthropic",
    inputPricePer1M: 15.0,
    outputPricePer1M: 75.0,
    contextWindow: 200000,
    tokenizer: "claude",
  },
  {
    id: "claude-sonnet-4-6",
    name: "Claude Sonnet 4.6",
    provider: "anthropic",
    inputPricePer1M: 3.0,
    outputPricePer1M: 15.0,
    contextWindow: 200000,
    tokenizer: "claude",
  },
  {
    id: "claude-haiku-4-5",
    name: "Claude Haiku 4.5",
    provider: "anthropic",
    inputPricePer1M: 0.8,
    outputPricePer1M: 4.0,
    contextWindow: 200000,
    tokenizer: "claude",
  },
  // OpenAI GPT
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "openai",
    inputPricePer1M: 2.5,
    outputPricePer1M: 10.0,
    contextWindow: 128000,
    tokenizer: "gpt",
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o mini",
    provider: "openai",
    inputPricePer1M: 0.15,
    outputPricePer1M: 0.6,
    contextWindow: 128000,
    tokenizer: "gpt",
  },
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    provider: "openai",
    inputPricePer1M: 10.0,
    outputPricePer1M: 30.0,
    contextWindow: 128000,
    tokenizer: "gpt",
  },
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    provider: "openai",
    inputPricePer1M: 0.5,
    outputPricePer1M: 1.5,
    contextWindow: 16385,
    tokenizer: "gpt",
  },
];

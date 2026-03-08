export interface ModelPricing {
  id: string;
  name: string;
  provider: string;
  inputPricePer1M: number;
  outputPricePer1M: number;
  contextWindow: number;
  tokenizer: "cl100k" | "approx";
  note?: string;
}

export const PROVIDER_LABELS: Record<string, string> = {
  anthropic:   "Anthropic",
  openai:      "OpenAI",
  google:      "Google",
  xai:         "xAI (Grok)",
  mistral:     "Mistral AI",
  moonshot:    "Moonshot AI (Kimi)",
  minimax:     "MiniMax",
  qwen:        "Qwen (Alibaba)",
  volcengine:  "Volcano Engine",
  byteplus:    "BytePlus",
  qianfan:     "Qianfan (Baidu)",
  together:    "Together AI",
  huggingface: "Hugging Face",
  openrouter:  "OpenRouter",
  litellm:     "LiteLLM",
  cloudflare:  "Cloudflare AI Gateway",
  vercel:      "Vercel AI Gateway",
  venice:      "Venice AI",
  custom:      "Custom Provider",
};

export const MODELS: ModelPricing[] = [
  // ── Anthropic ─────────────────────────────────────────────────────────────
  { id: "claude-opus-4-6",   name: "Claude Opus 4.6",   provider: "anthropic", inputPricePer1M: 15.0,  outputPricePer1M: 75.0,  contextWindow: 200000,  tokenizer: "cl100k" },
  { id: "claude-sonnet-4-6", name: "Claude Sonnet 4.6", provider: "anthropic", inputPricePer1M: 3.0,   outputPricePer1M: 15.0,  contextWindow: 200000,  tokenizer: "cl100k" },
  { id: "claude-haiku-4-5",  name: "Claude Haiku 4.5",  provider: "anthropic", inputPricePer1M: 0.8,   outputPricePer1M: 4.0,   contextWindow: 200000,  tokenizer: "cl100k" },

  // ── OpenAI ────────────────────────────────────────────────────────────────
  { id: "gpt-4o",        name: "GPT-4o",        provider: "openai", inputPricePer1M: 2.5,  outputPricePer1M: 10.0, contextWindow: 128000, tokenizer: "cl100k" },
  { id: "gpt-4o-mini",   name: "GPT-4o mini",   provider: "openai", inputPricePer1M: 0.15, outputPricePer1M: 0.6,  contextWindow: 128000, tokenizer: "cl100k" },
  { id: "o1",            name: "o1",             provider: "openai", inputPricePer1M: 15.0, outputPricePer1M: 60.0, contextWindow: 200000, tokenizer: "cl100k" },
  { id: "o3-mini",       name: "o3-mini",        provider: "openai", inputPricePer1M: 1.1,  outputPricePer1M: 4.4,  contextWindow: 200000, tokenizer: "cl100k" },
  { id: "gpt-4-turbo",   name: "GPT-4 Turbo",   provider: "openai", inputPricePer1M: 10.0, outputPricePer1M: 30.0, contextWindow: 128000, tokenizer: "cl100k" },
  { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", provider: "openai", inputPricePer1M: 0.5,  outputPricePer1M: 1.5,  contextWindow: 16385,  tokenizer: "cl100k" },

  // ── Google ────────────────────────────────────────────────────────────────
  { id: "gemini-2.5-pro",   name: "Gemini 2.5 Pro",   provider: "google", inputPricePer1M: 1.25,  outputPricePer1M: 10.0, contextWindow: 1048576, tokenizer: "approx" },
  { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash", provider: "google", inputPricePer1M: 0.075, outputPricePer1M: 0.3,  contextWindow: 1048576, tokenizer: "approx" },
  { id: "gemini-1.5-pro",   name: "Gemini 1.5 Pro",   provider: "google", inputPricePer1M: 1.25,  outputPricePer1M: 5.0,  contextWindow: 2000000, tokenizer: "approx" },
  { id: "gemini-1.5-flash", name: "Gemini 1.5 Flash", provider: "google", inputPricePer1M: 0.075, outputPricePer1M: 0.3,  contextWindow: 1000000, tokenizer: "approx" },

  // ── xAI (Grok) ────────────────────────────────────────────────────────────
  { id: "grok-3",      name: "Grok 3",      provider: "xai", inputPricePer1M: 3.0,  outputPricePer1M: 15.0, contextWindow: 131072, tokenizer: "cl100k" },
  { id: "grok-3-mini", name: "Grok 3 Mini", provider: "xai", inputPricePer1M: 0.3,  outputPricePer1M: 0.5,  contextWindow: 131072, tokenizer: "cl100k" },
  { id: "grok-2",      name: "Grok 2",      provider: "xai", inputPricePer1M: 2.0,  outputPricePer1M: 10.0, contextWindow: 131072, tokenizer: "cl100k" },

  // ── Mistral AI ────────────────────────────────────────────────────────────
  { id: "mistral-large", name: "Mistral Large", provider: "mistral", inputPricePer1M: 2.0, outputPricePer1M: 6.0, contextWindow: 131072, tokenizer: "cl100k" },
  { id: "mistral-small", name: "Mistral Small", provider: "mistral", inputPricePer1M: 0.1, outputPricePer1M: 0.3, contextWindow: 32768,  tokenizer: "cl100k" },
  { id: "codestral",     name: "Codestral",     provider: "mistral", inputPricePer1M: 0.2, outputPricePer1M: 0.6, contextWindow: 262144, tokenizer: "cl100k" },

  // ── Moonshot AI (Kimi) ────────────────────────────────────────────────────
  { id: "kimi-k2",           name: "Kimi K2.5",        provider: "moonshot", inputPricePer1M: 0.6, outputPricePer1M: 2.5, contextWindow: 131072, tokenizer: "cl100k" },
  { id: "moonshot-v1-128k",  name: "Moonshot v1 128k", provider: "moonshot", inputPricePer1M: 0.9, outputPricePer1M: 0.9, contextWindow: 128000, tokenizer: "cl100k" },
  { id: "moonshot-v1-32k",   name: "Moonshot v1 32k",  provider: "moonshot", inputPricePer1M: 0.4, outputPricePer1M: 0.4, contextWindow: 32000,  tokenizer: "cl100k" },

  // ── MiniMax ───────────────────────────────────────────────────────────────
  { id: "minimax-text-01", name: "MiniMax Text-01",  provider: "minimax", inputPricePer1M: 0.3,  outputPricePer1M: 1.1, contextWindow: 1000000, tokenizer: "cl100k" },
  { id: "abab6.5s",        name: "MiniMax abab6.5s", provider: "minimax", inputPricePer1M: 0.1,  outputPricePer1M: 0.1, contextWindow: 245760,  tokenizer: "cl100k" },

  // ── Qwen (Alibaba) ────────────────────────────────────────────────────────
  { id: "qwen3-235b", name: "Qwen3 235B",  provider: "qwen", inputPricePer1M: 0.6,  outputPricePer1M: 2.4,  contextWindow: 131072, tokenizer: "cl100k" },
  { id: "qwen-max",   name: "Qwen Max",    provider: "qwen", inputPricePer1M: 0.4,  outputPricePer1M: 1.2,  contextWindow: 32768,  tokenizer: "cl100k" },
  { id: "qwen-plus",  name: "Qwen Plus",   provider: "qwen", inputPricePer1M: 0.07, outputPricePer1M: 0.21, contextWindow: 131072, tokenizer: "cl100k" },
  { id: "qwen-turbo", name: "Qwen Turbo",  provider: "qwen", inputPricePer1M: 0.02, outputPricePer1M: 0.06, contextWindow: 131072, tokenizer: "cl100k" },

  // ── Volcano Engine (ByteDance) ────────────────────────────────────────────
  { id: "doubao-pro-32k",  name: "Doubao Pro 32k",  provider: "volcengine", inputPricePer1M: 0.11, outputPricePer1M: 0.28, contextWindow: 32768, tokenizer: "cl100k" },
  { id: "doubao-lite-32k", name: "Doubao Lite 32k", provider: "volcengine", inputPricePer1M: 0.04, outputPricePer1M: 0.1,  contextWindow: 32768, tokenizer: "cl100k" },

  // ── BytePlus ──────────────────────────────────────────────────────────────
  { id: "byteplus-doubao-pro", name: "Doubao Pro (BytePlus)", provider: "byteplus", inputPricePer1M: 0.15, outputPricePer1M: 0.4, contextWindow: 32768, tokenizer: "cl100k" },

  // ── Qianfan / Baidu ERNIE ─────────────────────────────────────────────────
  { id: "ernie-4.5-turbo", name: "ERNIE 4.5 Turbo", provider: "qianfan", inputPricePer1M: 0.28, outputPricePer1M: 1.12, contextWindow: 131072, tokenizer: "cl100k" },
  { id: "ernie-3.5",       name: "ERNIE 3.5",       provider: "qianfan", inputPricePer1M: 0.13, outputPricePer1M: 0.38, contextWindow: 8192,   tokenizer: "cl100k" },

  // ── Together AI ───────────────────────────────────────────────────────────
  { id: "llama-3.3-70b",   name: "Llama 3.3 70B",   provider: "together", inputPricePer1M: 0.88, outputPricePer1M: 0.88, contextWindow: 131072, tokenizer: "cl100k" },
  { id: "deepseek-r1-tog", name: "DeepSeek R1",      provider: "together", inputPricePer1M: 3.0,  outputPricePer1M: 7.0,  contextWindow: 163840, tokenizer: "cl100k" },
  { id: "mixtral-8x22b",   name: "Mixtral 8x22B",   provider: "together", inputPricePer1M: 1.2,  outputPricePer1M: 1.2,  contextWindow: 65536,  tokenizer: "cl100k" },

  // ── Hugging Face ──────────────────────────────────────────────────────────
  { id: "hf-llama-3.1-8b", name: "Llama 3.1 8B",  provider: "huggingface", inputPricePer1M: 0.1,  outputPricePer1M: 0.1,  contextWindow: 128000, tokenizer: "cl100k", note: "Serverless" },
  { id: "hf-mistral-7b",   name: "Mistral 7B",    provider: "huggingface", inputPricePer1M: 0.06, outputPricePer1M: 0.06, contextWindow: 32768,  tokenizer: "cl100k", note: "Serverless" },

  // ── Proxy / Gateway providers (pricing = underlying model) ────────────────
  { id: "openrouter-auto",   name: "OpenRouter (auto)",         provider: "openrouter", inputPricePer1M: 0, outputPricePer1M: 0, contextWindow: 128000, tokenizer: "cl100k", note: "Varies by routed model" },
  { id: "litellm-proxy",     name: "LiteLLM Proxy",             provider: "litellm",    inputPricePer1M: 0, outputPricePer1M: 0, contextWindow: 128000, tokenizer: "cl100k", note: "Depends on backend" },
  { id: "cloudflare-gw",     name: "Cloudflare AI Gateway",     provider: "cloudflare", inputPricePer1M: 0, outputPricePer1M: 0, contextWindow: 128000, tokenizer: "cl100k", note: "Depends on backend" },
  { id: "vercel-gw",         name: "Vercel AI Gateway",         provider: "vercel",     inputPricePer1M: 0, outputPricePer1M: 0, contextWindow: 128000, tokenizer: "cl100k", note: "Depends on backend" },

  // ── Venice AI ─────────────────────────────────────────────────────────────
  { id: "venice-llama-70b", name: "Llama 3.3 70B (Venice)", provider: "venice", inputPricePer1M: 1.0, outputPricePer1M: 1.0, contextWindow: 131072, tokenizer: "cl100k", note: "Privacy inference" },

  // ── Custom ────────────────────────────────────────────────────────────────
  { id: "custom", name: "Custom Model", provider: "custom", inputPricePer1M: 1.0, outputPricePer1M: 1.0, contextWindow: 128000, tokenizer: "cl100k", note: "Edit pricing as needed" },
];

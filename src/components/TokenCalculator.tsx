import { useState, useMemo } from "react";
import { MODELS, PROVIDER_LABELS } from "../data/models";
import type { ModelPricing } from "../data/models";
import { countTokensForModel, formatNumber, formatCost, calcCost } from "../utils/tokenizer";

const ALL_PROVIDERS = ["all", ...Object.keys(PROVIDER_LABELS)] as const;

export function TokenCalculator() {
  const [inputText, setInputText]       = useState("");
  const [outputText, setOutputText]     = useState("");
  const [selectedModelId, setSelectedModelId] = useState<string>(MODELS[0].id);
  const [providerFilter, setProviderFilter]   = useState<string>("all");

  const filteredModels = useMemo(
    () => providerFilter === "all" ? MODELS : MODELS.filter((m) => m.provider === providerFilter),
    [providerFilter]
  );

  const selectedModel: ModelPricing = MODELS.find((m) => m.id === selectedModelId) ?? MODELS[0];

  const inputTokens  = useMemo(() => countTokensForModel(inputText,  selectedModel.tokenizer), [inputText,  selectedModel.tokenizer]);
  const outputTokens = useMemo(() => countTokensForModel(outputText, selectedModel.tokenizer), [outputText, selectedModel.tokenizer]);

  const inputCost  = calcCost(inputTokens,  selectedModel.inputPricePer1M);
  const outputCost = calcCost(outputTokens, selectedModel.outputPricePer1M);
  const totalCost  = inputCost + outputCost;
  const contextUsedPct = Math.min(((inputTokens + outputTokens) / selectedModel.contextWindow) * 100, 100);

  function selectProvider(p: string) {
    setProviderFilter(p);
    const first = MODELS.find((m) => p === "all" || m.provider === p);
    if (first) setSelectedModelId(first.id);
  }

  return (
    <div className="calculator">
      {/* Provider filter */}
      <section className="card">
        <h2>Provider</h2>
        <div className="provider-scroll">
          {ALL_PROVIDERS.map((p) => (
            <button
              key={p}
              className={`tab ${providerFilter === p ? "active" : ""}`}
              onClick={() => selectProvider(p)}
            >
              {p === "all" ? "All" : (PROVIDER_LABELS[p] ?? p)}
            </button>
          ))}
        </div>

        <h2 style={{ marginTop: "1rem" }}>Model</h2>
        <div className="model-grid">
          {filteredModels.map((model) => (
            <button
              key={model.id}
              className={`model-card ${selectedModelId === model.id ? "selected" : ""}`}
              onClick={() => setSelectedModelId(model.id)}
            >
              <div className="model-name">{model.name}</div>
              <div className="model-prices">
                {model.inputPricePer1M === 0 && model.outputPricePer1M === 0 ? (
                  <span className="varies">{model.note ?? "Varies"}</span>
                ) : (
                  <>
                    <span>In: ${model.inputPricePer1M}/1M</span>
                    <span>Out: ${model.outputPricePer1M}/1M</span>
                  </>
                )}
              </div>
              <div className="model-ctx">{formatNumber(model.contextWindow)} ctx</div>
            </button>
          ))}
        </div>
      </section>

      {/* Text inputs */}
      <section className="card text-section">
        <div className="text-col">
          <label>
            <span>Input / Prompt</span>
            <span className="token-badge">{formatNumber(inputTokens)} tokens</span>
          </label>
          <textarea
            placeholder="Paste your prompt or input text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>
        <div className="text-col">
          <label>
            <span>Output / Completion</span>
            <span className="token-badge">{formatNumber(outputTokens)} tokens</span>
          </label>
          <textarea
            placeholder="Paste expected or sample output here..."
            value={outputText}
            onChange={(e) => setOutputText(e.target.value)}
          />
        </div>
      </section>

      {/* Results */}
      <section className="card results">
        <h2>Cost Estimate — {selectedModel.name}
          {selectedModel.note && <span className="model-note">{selectedModel.note}</span>}
        </h2>
        <div className="stats">
          <div className="stat">
            <div className="stat-label">Input tokens</div>
            <div className="stat-value">{formatNumber(inputTokens)}</div>
            <div className="stat-sub">{formatCost(inputCost)}</div>
          </div>
          <div className="stat">
            <div className="stat-label">Output tokens</div>
            <div className="stat-value">{formatNumber(outputTokens)}</div>
            <div className="stat-sub">{formatCost(outputCost)}</div>
          </div>
          <div className="stat highlight">
            <div className="stat-label">Total cost</div>
            <div className="stat-value">{formatCost(totalCost)}</div>
            <div className="stat-sub">{formatNumber(inputTokens + outputTokens)} tokens</div>
          </div>
          <div className="stat">
            <div className="stat-label">Per 1K requests</div>
            <div className="stat-value">{formatCost(totalCost * 1000)}</div>
            <div className="stat-sub">estimated</div>
          </div>
        </div>

        <div className="ctx-section">
          <div className="ctx-label">
            <span>Context window usage</span>
            <span>
              {formatNumber(inputTokens + outputTokens)} / {formatNumber(selectedModel.contextWindow)} tokens ({contextUsedPct.toFixed(1)}%)
            </span>
          </div>
          <div className="ctx-bar">
            <div
              className={`ctx-fill ${contextUsedPct > 90 ? "danger" : contextUsedPct > 70 ? "warn" : ""}`}
              style={{ width: `${contextUsedPct}%` }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

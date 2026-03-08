import { useState } from "react";
import { TokenCalculator } from "./components/TokenCalculator";
import { LiveMonitor } from "./components/LiveMonitor";
import "./App.css";

type Tab = "calculator" | "live";

function App() {
  const [tab, setTab] = useState<Tab>("calculator");

  return (
    <div className="app">
      <header className="header">
        <h1>LLM Token Calculator</h1>
        <p>Count tokens and estimate costs for Claude &amp; GPT models</p>
      </header>

      <nav className="nav-tabs">
        <button
          className={`nav-tab ${tab === "calculator" ? "active" : ""}`}
          onClick={() => setTab("calculator")}
        >
          Token 计算器
        </button>
        <button
          className={`nav-tab ${tab === "live" ? "active" : ""}`}
          onClick={() => setTab("live")}
        >
          实时监控
          <span className="nav-badge">OpenClaw</span>
        </button>
      </nav>

      <main>
        {tab === "calculator" ? <TokenCalculator /> : <LiveMonitor />}
      </main>
    </div>
  );
}

export default App;

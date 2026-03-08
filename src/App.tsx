import { useState } from "react";
import { TokenCalculator } from "./components/TokenCalculator";
import { LiveMonitor } from "./components/LiveMonitor";
import { Settings } from "./components/Settings";
import "./App.css";

type Tab = "calculator" | "live" | "settings";

function App() {
  const [tab, setTab] = useState<Tab>("live");

  return (
    <div className="app">
      <header className="header">
        <h1>LLM Token Calculator</h1>
        <p>Count tokens and estimate costs · OpenClaw real-time monitor</p>
      </header>

      <nav className="nav-tabs">
        <button className={`nav-tab ${tab === "live" ? "active" : ""}`} onClick={() => setTab("live")}>
          实时监控
          <span className="nav-badge">OpenClaw</span>
        </button>
        <button className={`nav-tab ${tab === "calculator" ? "active" : ""}`} onClick={() => setTab("calculator")}>
          Token 计算器
        </button>
        <button className={`nav-tab ${tab === "settings" ? "active" : ""}`} onClick={() => setTab("settings")}>
          设置
        </button>
      </nav>

      <main>
        {tab === "calculator" && <TokenCalculator />}
        {tab === "live"       && <LiveMonitor />}
        {tab === "settings"   && <Settings />}
      </main>
    </div>
  );
}

export default App;

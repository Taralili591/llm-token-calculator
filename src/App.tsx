import { useState } from "react";
import { LangProvider, useLang } from "./LangContext";
import { TokenCalculator } from "./components/TokenCalculator";
import { LiveMonitor } from "./components/LiveMonitor";
import { Settings } from "./components/Settings";
import "./App.css";

type Tab = "calculator" | "live" | "settings";

function AppInner() {
  const { t, lang, toggle } = useLang();
  const [tab, setTab] = useState<Tab>("live");

  return (
    <div className="app">
      <header className="header">
        <div className="header-text">
          <h1>{t.appTitle}</h1>
          <p>{t.appSubtitle}</p>
        </div>
        <button className="lang-toggle" onClick={toggle} title="Switch language">
          {lang === "zh" ? "EN" : "中文"}
        </button>
      </header>

      <nav className="nav-tabs">
        <button className={`nav-tab ${tab === "live" ? "active" : ""}`} onClick={() => setTab("live")}>
          {t.tabMonitor}
          <span className="nav-badge">OpenClaw</span>
        </button>
        <button className={`nav-tab ${tab === "calculator" ? "active" : ""}`} onClick={() => setTab("calculator")}>
          {t.tabCalc}
        </button>
        <button className={`nav-tab ${tab === "settings" ? "active" : ""}`} onClick={() => setTab("settings")}>
          {t.tabSettings}
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

function App() {
  return (
    <LangProvider>
      <AppInner />
    </LangProvider>
  );
}

export default App;

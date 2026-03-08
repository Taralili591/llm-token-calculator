export type Lang = "zh" | "en";

export const translations = {
  zh: {
    // App
    appTitle:    "LLM Token 计算器",
    appSubtitle: "Token 用量统计 · OpenClaw 实时监控",
    tabMonitor:  "实时监控",
    tabCalc:     "Token 计算器",
    tabSettings: "设置",

    // LiveMonitor
    connected:      "已连接 OpenClaw 日志服务",
    disconnected:   "未连接（重试中…）",
    clear:          "清空",
    totalInput:     "累计输入",
    totalOutput:    "累计输出",
    totalCost:      "累计费用",
    requests:       "调用次数",
    waiting:        "等待 OpenClaw 上报 token 用量…",
    colTime:        "时间",
    colModel:       "模型",
    colLabel:       "标签",
    colInput:       "输入",
    colOutput:      "输出",
    colCost:        "费用",
    guideTitle:     "如何在 OpenClaw 中配置调用？",
    guideDesc:      "在你的 OpenClaw Workspace Skill 或工具回调中，每次 AI 调用后发送：",

    // TokenCalculator
    providerLabel:  "Provider",
    modelLabel:     "Model",
    varies:         "价格不定",
    inputLabel:     "输入 / Prompt",
    outputLabel:    "输出 / Completion",
    inputTokens:    "输入 Token",
    outputTokens:   "输出 Token",
    totalCostLabel: "总费用",
    per1k:          "每 1K 次请求",
    estimated:      "估算",
    ctxUsage:       "Context 窗口使用率",
    costEstimate:   "费用估算",

    // Settings
    settingsTitle:   "OpenClaw 日志服务器",
    settingsDesc:    "配置 Token 日志 API 的地址。本机运行 OpenClaw 时保持默认值即可；\n部署到其他机器或云端时在此填写对应地址。",
    save:            "保存",
    saved:           "已保存 ✓",
    reset:           "重置",
    endpointsTitle:  "API 端点",
    integrationTitle:"OpenClaw 调用示例（复制到你的 skill/hook 中）",
    epLogTokens:     "OpenClaw 上报 token 用量",
    epStream:        "SSE 实时推送（前端订阅）",
    epHistory:       "获取完整历史记录",
    epClear:         "清空历史记录",
  },

  en: {
    // App
    appTitle:    "LLM Token Calculator",
    appSubtitle: "Token usage & cost estimator · OpenClaw real-time monitor",
    tabMonitor:  "Live Monitor",
    tabCalc:     "Token Calculator",
    tabSettings: "Settings",

    // LiveMonitor
    connected:      "Connected to OpenClaw logger",
    disconnected:   "Disconnected (retrying…)",
    clear:          "Clear",
    totalInput:     "Total Input",
    totalOutput:    "Total Output",
    totalCost:      "Total Cost",
    requests:       "Requests",
    waiting:        "Waiting for OpenClaw to report token usage…",
    colTime:        "Time",
    colModel:       "Model",
    colLabel:       "Label",
    colInput:       "Input",
    colOutput:      "Output",
    colCost:        "Cost",
    guideTitle:     "How to configure OpenClaw?",
    guideDesc:      "In your OpenClaw Workspace Skill or tool callback, send after each AI call:",

    // TokenCalculator
    providerLabel:  "Provider",
    modelLabel:     "Model",
    varies:         "Varies",
    inputLabel:     "Input / Prompt",
    outputLabel:    "Output / Completion",
    inputTokens:    "Input tokens",
    outputTokens:   "Output tokens",
    totalCostLabel: "Total cost",
    per1k:          "Per 1K requests",
    estimated:      "estimated",
    ctxUsage:       "Context window usage",
    costEstimate:   "Cost Estimate",

    // Settings
    settingsTitle:   "OpenClaw Logger Server",
    settingsDesc:    "Configure the Token Logger API URL. Keep the default if OpenClaw runs on this machine.\nChange it if you've deployed the API server to another host.",
    save:            "Save",
    saved:           "Saved ✓",
    reset:           "Reset",
    endpointsTitle:  "API Endpoints",
    integrationTitle:"OpenClaw integration snippet (paste into your skill/hook)",
    epLogTokens:     "OpenClaw logs token usage here",
    epStream:        "SSE stream for frontend",
    epHistory:       "Get full history",
    epClear:         "Clear history",
  },
};

export type T = Record<keyof (typeof translations)["zh"], string>;

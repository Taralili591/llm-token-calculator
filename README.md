# LLM Token Calculator

**实时监控 LLM token 用量与费用，支持 19 个主流 AI 提供商。**
**Real-time LLM token usage monitor and cost estimator. Supports 19 major AI providers.**

[中文](#中文说明) · [English](#english)

---

## 中文说明

### 解决了什么问题？

用 Claude、GPT、Gemini 等 LLM 开发时，你很难直观地知道：

- 每次调用到底花了多少钱？
- 累计下来 token 用量有多少？
- 哪个模型/哪个功能最耗费 token？

这个工具分两部分：

1. **实时监控**：配合 [OpenClaw](https://github.com/openclaw/openclaw) 使用，每次 AI 调用后自动上报 token 用量，前端实时显示累计消耗和费用。
2. **Token 计算器**：手动粘贴 prompt/completion，估算任意模型的 token 数和费用。

### 功能

- 实时显示每次调用的 token 消耗与费用（需配合 OpenClaw）
- 支持 19 个提供商、50+ 个模型（Anthropic、OpenAI、Google、xAI、Mistral、Moonshot/Kimi、Qwen、MiniMax 等）
- 离线 Token 计算器，支持 cl100k 精确计算
- 中文 / English 界面切换
- API 地址可自定义，适合本机或远程部署

---

### 安装与运行

**环境要求：** Node.js 18+

```bash
# 1. 克隆项目
git clone https://github.com/Taralili591/llm-token-calculator.git
cd llm-token-calculator

# 2. 安装依赖
npm install

# 3. 启动前端（端口 5173）
npm run dev

# 4. 启动 Token 日志 API（端口 3001）
npm run server
```

打开浏览器访问 `http://localhost:5173`

---

### 连接 OpenClaw

> 如果你只想用 Token 计算器，可以跳过这一步。

**第一步：确保 Token 日志 API 已启动**

```bash
npm run server
# 输出：Token logger API running on http://localhost:3001
```

**第二步：在 OpenClaw 的 Skill 或 Hook 中上报 token 用量**

每次 AI 调用完成后，在你的 OpenClaw Workspace Skill 或工具回调里发送：

```bash
curl -s -X POST http://localhost:3001/api/log-tokens \
  -H "Content-Type: application/json" \
  -d '{
    "model": "claude-sonnet-4-6",
    "provider": "anthropic",
    "inputTokens": 1234,
    "outputTokens": 567,
    "inputCostPer1M": 3.0,
    "outputCostPer1M": 15.0,
    "label": "my-task"
  }'
```

| 字段 | 必填 | 说明 |
|------|------|------|
| `model` | 是 | 模型名称，如 `claude-sonnet-4-6` |
| `provider` | 是 | 提供商，如 `anthropic`、`openai` |
| `inputTokens` | 是 | 输入 token 数 |
| `outputTokens` | 是 | 输出 token 数 |
| `inputCostPer1M` | 是 | 每百万输入 token 的价格（USD） |
| `outputCostPer1M` | 是 | 每百万输出 token 的价格（USD） |
| `label` | 否 | 自定义标签，用于区分不同调用场景 |

上报成功后，网页的「实时监控」页面会立即更新。

**第三步（可选）：部署到其他机器**

如果 API 不在本机，在工具的「设置」页面修改 API 地址，填入实际地址后保存即可。

---

### 后台常驻（PM2）

```bash
# 安装 PM2
npm install -g pm2

# 启动两个服务
pm2 start ecosystem.config.cjs

# 设置开机自启（按提示执行 sudo 命令）
pm2 startup
pm2 save
```

---

## English

### What problem does it solve?

When building with LLMs (Claude, GPT, Gemini, etc.), it's hard to know:

- How much did each API call actually cost?
- What's the cumulative token usage over a session?
- Which feature or task burns the most tokens?

This tool has two parts:

1. **Live Monitor**: Works with [OpenClaw](https://github.com/openclaw/openclaw). After each AI call, your skill/hook POSTs token usage to the local API — the dashboard updates in real time.
2. **Token Calculator**: Paste any prompt/completion and estimate token count and cost for any supported model.

### Features

- Real-time per-call token and cost display (requires OpenClaw integration)
- 19 providers, 50+ models: Anthropic, OpenAI, Google, xAI, Mistral, Moonshot/Kimi, Qwen, MiniMax, and more
- Offline token calculator with cl100k-based counting
- Chinese / English UI toggle
- Configurable API URL for local or remote deployment

---

### Installation

**Requirements:** Node.js 18+

```bash
# 1. Clone the repo
git clone https://github.com/Taralili591/llm-token-calculator.git
cd llm-token-calculator

# 2. Install dependencies
npm install

# 3. Start the frontend (port 5173)
npm run dev

# 4. Start the token logger API (port 3001)
npm run server
```

Open `http://localhost:5173` in your browser.

---

### Connecting OpenClaw

> Skip this section if you only need the Token Calculator.

**Step 1: Make sure the logger API is running**

```bash
npm run server
# Output: Token logger API running on http://localhost:3001
```

**Step 2: Report token usage from your OpenClaw skill or hook**

After each AI call, POST to the logger:

```bash
curl -s -X POST http://localhost:3001/api/log-tokens \
  -H "Content-Type: application/json" \
  -d '{
    "model": "claude-sonnet-4-6",
    "provider": "anthropic",
    "inputTokens": 1234,
    "outputTokens": 567,
    "inputCostPer1M": 3.0,
    "outputCostPer1M": 15.0,
    "label": "chat-reply"
  }'
```

| Field | Required | Description |
|-------|----------|-------------|
| `model` | Yes | Model name, e.g. `claude-sonnet-4-6` |
| `provider` | Yes | Provider name, e.g. `anthropic`, `openai` |
| `inputTokens` | Yes | Number of input tokens |
| `outputTokens` | Yes | Number of output tokens |
| `inputCostPer1M` | Yes | Input price per 1M tokens (USD) |
| `outputCostPer1M` | Yes | Output price per 1M tokens (USD) |
| `label` | No | Optional label to identify the call source |

Once posted, the Live Monitor updates immediately.

**Step 3 (optional): Remote deployment**

If the API runs on a different machine, go to the **Settings** tab and update the API URL.

---

### Background service (PM2)

```bash
# Install PM2
npm install -g pm2

# Start both services
pm2 start ecosystem.config.cjs

# Enable auto-start on boot (follow the sudo instruction it prints)
pm2 startup
pm2 save
```

---

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/log-tokens` | Report token usage (called by OpenClaw) |
| `GET` | `/api/stream` | SSE stream for real-time frontend updates |
| `GET` | `/api/history` | Get full history |
| `DELETE` | `/api/history` | Clear history |
| `GET` | `/api/health` | Health check |

---

### Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: Express 5 + Server-Sent Events (SSE)
- **Tokenizer**: [gpt-tokenizer](https://github.com/niclas-attalos/gpt-tokenizer) (cl100k_base, pure JS)
- **Process manager**: PM2

import type { Concept } from '../lib/types';

export const concepts: Concept[] = [
  {
    id: 'model',
    term: { zh: '模型 (Model)', en: 'Model', ja: 'モデル (Model)' },
    hook: { zh: '大脑', en: 'The brain', ja: '脳' },
    body: {
      zh: '基础大语言模型本身——Claude Opus、GPT、Gemini、Grok 等。它负责「思考」：理解输入、推理、产出文本或工具调用。但模型本身不能读你的文件、不能跑命令，它只是一个会预测下一个 token 的函数。要让它真正「干活」，需要外面套一层 harness。',
      en: 'The foundation LLM itself — Claude Opus, GPT, Gemini, Grok. It does the "thinking": understands input, reasons, emits text or tool calls. But a model alone cannot read your files or run commands; it is just a function that predicts the next token. To actually get work done it needs a harness wrapped around it.',
      ja: '基盤となる LLM そのもの（Claude Opus・GPT・Gemini・Grok など）。入力を理解し推論し、テキストやツール呼び出しを出力する「思考」を担う。ただしモデル単体ではファイルを読んだりコマンドを実行したりはできない。実際に作業させるには harness が必要。',
    },
    see: ['harness', 'tool-calling'],
  },
  {
    id: 'harness',
    term: { zh: 'Agent Harness', en: 'Agent Harness', ja: 'Agent Harness' },
    hook: { zh: '把模型接上现实世界的「运行外壳」', en: 'The runtime shell that wires a model to the real world', ja: 'モデルを現実につなぐ「運行シェル」' },
    body: {
      zh: 'Harness 是把模型接上工具、文件、shell、上下文、权限和任务循环的运行外壳。它负责：维护对话与上下文、把工具暴露给模型、执行模型发出的工具调用、把结果喂回去、循环直到任务完成。Claude Code、Codex CLI 都是「带特定 harness 的产品」；Pi、LangGraph 则是让你「自己写 harness」的框架。模型决定上限，harness 决定体验。',
      en: 'A harness is the runtime shell that connects a model to tools, files, the shell, context, permissions and a task loop. It maintains conversation/context, exposes tools to the model, executes the tool calls the model emits, feeds results back, and loops until the task is done. Claude Code and Codex CLI are products with a specific harness; Pi and LangGraph are frameworks that let you write your own. The model sets the ceiling; the harness decides the experience.',
      ja: 'Harness はモデルをツール・ファイル・シェル・コンテキスト・権限・タスクループに接続する運行シェル。会話／文脈の維持、ツールの提示、モデルが出すツール呼び出しの実行、結果の差し戻し、完了までのループを担う。Claude Code や Codex CLI は「特定の harness を備えた製品」、Pi や LangGraph は「自分で harness を書く」フレームワーク。モデルが上限を、harness が体験を決める。',
    },
    see: ['model', 'tool-calling', 'agent-loop', 'infra'],
  },
  {
    id: 'agent-loop',
    term: { zh: 'Agent 循环 (Agentic Loop)', en: 'Agentic Loop', ja: 'Agent ループ' },
    hook: { zh: '思考 → 行动 → 观察 → 重复', en: 'Think → act → observe → repeat', ja: '思考 → 行動 → 観察 → 繰り返し' },
    body: {
      zh: '智能体之所以是「智能体」而非「补全」，核心就在这个循环：模型思考下一步 → 调用工具（读文件 / 跑命令 / 搜索）→ 观察结果 → 再思考。它会自主多步推进，直到判断任务完成或需要人介入。循环的质量（什么时候停、如何压缩上下文、如何纠错）是各家产品拉开差距的关键。',
      en: 'What makes an agent an "agent" rather than autocomplete is this loop: the model decides a next step → calls a tool (read a file / run a command / search) → observes the result → thinks again. It drives forward autonomously over many steps until it judges the task done or needs a human. The quality of this loop (when to stop, how to compact context, how to self-correct) is where products separate themselves.',
      ja: 'エージェントを「補完」ではなく「エージェント」たらしめるのがこのループ。次の一手を考える→ツール呼び出し（ファイル読み・コマンド・検索）→結果を観察→再び思考。完了または人の介入が必要と判断するまで、多段で自律的に進める。ループの質（停止判断・文脈圧縮・自己修正）が各製品の差になる。',
    },
    see: ['harness', 'tool-calling'],
  },
  {
    id: 'tool-calling',
    term: { zh: '工具调用 / MCP', en: 'Tool Calling / MCP', ja: 'ツール呼び出し / MCP' },
    hook: { zh: '让模型能「动手」', en: 'Letting the model act, not just talk', ja: 'モデルに「手」を持たせる' },
    body: {
      zh: '工具调用让模型不止会说话，还能行动：把「读文件」「执行 bash」「查数据库」等能力以结构化接口暴露给模型，模型输出一个调用请求，harness 执行后把结果返回。MCP（Model Context Protocol）是 Anthropic 推出、现已成事实标准的开放协议，让工具 / 数据源以统一方式接入任意智能体——一次实现，到处可用。',
      en: 'Tool calling lets a model act, not just talk: capabilities like "read a file", "run bash", "query a database" are exposed as structured interfaces; the model emits a call request, the harness executes it and returns the result. MCP (Model Context Protocol), introduced by Anthropic and now a de-facto standard, is an open protocol so tools/data sources plug into any agent in a uniform way — implement once, use everywhere.',
      ja: 'ツール呼び出しはモデルに「行動」を与える。ファイル読み・bash 実行・DB 照会などを構造化インターフェースとして提示し、モデルが呼び出し要求を出すと harness が実行して結果を返す。MCP（Model Context Protocol）は Anthropic 発で事実上の標準となったオープンプロトコルで、ツール／データ源を任意のエージェントに統一的に接続できる（一度実装すればどこでも使える）。',
    },
    see: ['harness', 'agent-loop'],
  },
  {
    id: 'infra',
    term: { zh: 'Agent 基础设施', en: 'Agent Infrastructure', ja: 'Agent 基盤' },
    hook: { zh: '比 harness 更大的底座', en: 'The substrate beneath the harness', ja: 'harness より下の土台' },
    body: {
      zh: '当你不只跑一个智能体、而要让很多智能体稳定地跑在生产里，就需要基础设施：网关 / 路由（统一多家模型 API、做容灾与成本控制）、运行时沙箱（安全地执行代码）、编排（多智能体协作）、可观测性（追踪、日志、评测）、部署。LiteLLM、OpenRouter、Portkey 是网关层的代表；用户自研的 OpenClaw 就属于「自托管多模型 AI 网关」。',
      en: 'When you run not one agent but many, reliably, in production, you need infrastructure: gateways/routing (unify many model APIs, add failover and cost control), runtime sandboxes (execute code safely), orchestration (multi-agent collaboration), observability (tracing, logs, eval) and deployment. LiteLLM, OpenRouter and Portkey represent the gateway layer; the owner\'s own OpenClaw is a "self-hosted multi-provider AI gateway".',
      ja: '1 つではなく多数のエージェントを本番で安定運用するには基盤が要る。ゲートウェイ／ルーティング（多数のモデル API を統一し、フェイルオーバーとコスト管理）、サンドボックス（安全なコード実行）、編成（マルチエージェント連携）、可観測性（トレース・ログ・評価）、デプロイ。LiteLLM・OpenRouter・Portkey がゲートウェイ層の代表。筆者自作の OpenClaw は「自己ホスト型マルチプロバイダ AI ゲートウェイ」。',
    },
    see: ['harness', 'gateway'],
  },
  {
    id: 'gateway',
    term: { zh: 'AI 网关 / LLM 路由', en: 'AI Gateway / LLM Router', ja: 'AI ゲートウェイ / LLM ルーター' },
    hook: { zh: '一个入口，接住所有模型', en: 'One endpoint in front of every model', ja: '1 つの入口で全モデル' },
    body: {
      zh: '网关在众多模型供应商前面放一个统一的（通常 OpenAI 兼容的）端点，提供路由、容灾、限流、虚拟密钥、按团队预算、成本追踪、缓存与护栏。好处是：应用只对接一个 API，而非十几个；可以随时切换 / 混用模型，并集中治理。自托管首选 LiteLLM，零运维首选 OpenRouter，企业治理首选 Portkey。',
      en: 'A gateway puts a single (usually OpenAI-compatible) endpoint in front of many model providers, adding routing, failover, rate limiting, virtual keys, per-team budgets, cost tracking, caching and guardrails. The payoff: your app talks to one API instead of a dozen, can switch/mix models freely, and is governed centrally. Self-host → LiteLLM; zero-ops → OpenRouter; enterprise governance → Portkey.',
      ja: 'ゲートウェイは多数のモデルプロバイダの前に統一エンドポイント（多くは OpenAI 互換）を置き、ルーティング・フェイルオーバー・レート制限・仮想キー・チーム別予算・コスト追跡・キャッシュ・ガードレールを提供する。利点はアプリが 1 つの API だけを叩けばよく、モデルを自由に切替／併用でき、集中管理できること。自己ホストなら LiteLLM、ノーオペなら OpenRouter、企業統制なら Portkey。',
    },
    see: ['infra', 'model'],
  },
  {
    id: 'cli-vs-ide',
    term: { zh: 'CLI vs IDE 智能体', en: 'CLI vs IDE Agents', ja: 'CLI と IDE エージェント' },
    hook: { zh: '终端的可编排 vs 编辑器的即时', en: 'Programmable terminal vs in-editor immediacy', ja: 'ターミナルの組込性 vs エディタの即時性' },
    body: {
      zh: '同样是编程智能体，形态决定用法。CLI 智能体（Claude Code、Codex CLI）跑在终端，天然可脚本化、可并行、可塞进 CI 与 wmux/tmux，适合「放手让它跑」的大改造与自动化。IDE / 平台型（Cursor、Antigravity、Copilot）强在即时补全、内联编辑与可视化审阅，适合贴身结对。很多人两者并用：CLI 干重活，IDE 做精修。',
      en: 'Both are coding agents, but form factor drives usage. CLI agents (Claude Code, Codex CLI) run in the terminal — scriptable, parallelizable, droppable into CI and wmux/tmux — ideal for "let it run" large refactors and automation. IDE/platform tools (Cursor, Antigravity, Copilot) shine at instant completion, inline edits and visual review — ideal for close pairing. Many use both: CLI for heavy lifting, IDE for polish.',
      ja: 'どちらもコーディングエージェントだが、形態が使い方を決める。CLI 系（Claude Code・Codex CLI）はターミナルで動き、スクリプト化・並列化・CI や wmux/tmux への組込が容易で、「任せて走らせる」大規模改修や自動化に最適。IDE／プラットフォーム系（Cursor・Antigravity・Copilot）は即時補完・インライン編集・可視化レビューに強く、密な協働向き。両方を併用する人も多い（CLI で重作業、IDE で仕上げ）。',
    },
    see: ['harness'],
  },
];

export const conceptMap = Object.fromEntries(concepts.map((c) => [c.id, c]));

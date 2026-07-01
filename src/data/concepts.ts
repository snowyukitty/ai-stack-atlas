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
  {
    id: 'text-to-music',
    term: { zh: '文生音乐 (Text-to-Music)', en: 'Text-to-Music', ja: 'テキスト→音楽' },
    hook: { zh: '一句话变一首歌', en: 'A sentence becomes a song', ja: '一文が一曲になる' },
    body: {
      zh: 'AI 音乐生成把自然语言（或歌词、风格标签）映射为音频波形。2026 年的第一梯队（Suno v5、Udio）已能生成带人声演唱、编曲与混音的完整歌曲；第二梯队专注器乐配乐（ElevenLabs Music、Loudly）、古典作曲（AIVA）或实时流式 BGM（Mubert）。选型关键：要完整歌曲还是背景乐？要分轨进 DAW 还是一键出成品？商用权是否在订阅期内创作？版权方面，Suno / Udio 已与主流厂牌达成和解，条款仍在演进。',
      en: 'AI music generation maps natural language (or lyrics and style tags) to audio waveforms. In 2026 the top tier (Suno v5, Udio) produces full songs with sung vocals, arrangement and mix; the second tier covers instrumental beds (ElevenLabs Music, Loudly), classical composition (AIVA) or real-time streaming BGM (Mubert). Pick by: full song vs bed? Stems for a DAW vs one-shot output? Commercial rights only while subscribed? Suno / Udio have major-label settlements but terms are still evolving.',
      ja: 'AI 音楽生成は自然言語（または歌詞・スタイルタグ）を音波に写像する。2026 年の第一線（Suno v5、Udio）は歌唱・編曲・ミックス付きフルソングを生成。第二線はインスト BGM（ElevenLabs Music、Loudly）、クラシック作曲（AIVA）、リアルタイム BGM（Mubert）。選定軸：フルソングか BGM か？DAW 用ステムか一発完成か？商用権は購読中のみか？Suno／Udio は大手レーベルと和解済みだが条項は変動中。',
    },
    see: ['text-to-video'],
  },
  {
    id: 'text-to-video',
    term: { zh: '文生视频 (Text-to-Video)', en: 'Text-to-Video', ja: 'テキスト→動画' },
    hook: { zh: '文字变镜头', en: 'Words become shots', ja: '言葉がショットになる' },
    body: {
      zh: '文生视频（T2V）与图生视频（I2V）是扩散 Transformer 的多帧扩展：从随机噪声同时精炼多帧，由文本编码器引导生成连贯短片。难的不是单帧画质，而是时序一致性——主体、光照、镜头运动在帧间不漂移。2026 年 Video Arena 盲测由 Kling v3 领跑，LTX-2 Fast 以极低秒价居次席。西方旗舰 Sora 2、Veo 3 强在物理模拟与原生音画同步；Runway Gen-4 强在专业镜头控制与后期编辑。实用工作流：用 LTX-2 / Seedance 大量筛概念，Kling / Sora 精修关键镜头，Runway 做后期。',
      en: 'Text-to-video (T2V) and image-to-video (I2V) extend diffusion transformers across frames: refine many frames at once from noise, guided by a text encoder. The hard part is not a single frame\'s look but temporal consistency — subjects, lighting and camera motion that don\'t drift. In 2026 the Video Arena blind leaderboard is led by Kling v3, with LTX-2 Fast #2 on rock-bottom per-second cost. Western flagships Sora 2 and Veo 3 excel at physics and native A/V sync; Runway Gen-4 at pro camera control and post. Practical pipeline: LTX-2 / Seedance for volume, Kling / Sora for hero shots, Runway for post.',
      ja: 'T2V／I2V は拡散 Transformer のマルチフレーム拡張。ノイズから複数フレームを同時精製し、テキストエンコーダが誘導。難所は単フレーム画質ではなく時間的一貫性。2026 年 Video Arena 盲測は Kling v3 が首位、LTX-2 Fast が秒単価最安で 2 位。西洋旗艦 Sora 2・Veo 3 は物理とネイティブ音画同期、Runway Gen-4 はプロカメラ制御と後工程。実務 WF：LTX-2／Seedance で量産、Kling／Sora で仕上げ、Runway でポスト。',
    },
    see: ['text-to-music', 'text-to-image', 'model'],
  },
  {
    id: 'text-to-image',
    term: { zh: '文生图 (Text-to-Image)', en: 'Text-to-Image', ja: 'テキスト→画像' },
    hook: { zh: '文字变画面', en: 'Words become pictures', ja: '言葉が画面になる' },
    body: {
      zh: '文生图把自然语言映射为像素（或矢量）画面。2026 年 Image Arena 盲测由 GPT Image 2（Elo 1339）领跑；Midjourney 在主观美学上仍是许多创作者首选；Flux / SD 3.5 代表开源自托管路线（ComfyUI + LoRA + ControlNet）；Ideogram 专攻图内文字渲染；Recraft 专攻 SVG 矢量品牌设计。选型关键：要公榜质量、要「好看」、要可读文字、要自托管、还是要矢量可编辑？',
      en: 'Text-to-image maps natural language to pixels (or vectors). In 2026 the Image Arena blind board is led by GPT Image 2 (Elo 1339); Midjourney remains many creators\' subjective aesthetic pick; Flux / SD 3.5 represent the open self-host path (ComfyUI + LoRA + ControlNet); Ideogram owns in-image text; Recraft owns editable SVG brand design. Pick by: public-board quality, pure aesthetics, readable type, self-hosting or editable vectors?',
      ja: 'テキスト→画像は自然言語をピクセル（またはベクター）に写像。2026 年 Image Arena は GPT Image 2（Elo 1339）が首位。Midjourney は主観的美学で定番。Flux／SD 3.5 はオープン自己ホスト（ComfyUI＋LoRA＋ControlNet）。Ideogram は画像内文字、Recraft は SVG ブランドデザイン。',
    },
    see: ['text-to-video', 'model'],
  },
  {
    id: 'voice-clone',
    term: { zh: '语音克隆 (Voice Cloning)', en: 'Voice Cloning', ja: '音声クローン' },
    hook: { zh: '十秒样本，无限配音', en: 'Ten seconds of audio, endless dubbing', ja: '10 秒の音声で無限吹替' },
    body: {
      zh: '现代语音克隆不是微调整个模型，而是说话人编码器把参考音频压成固定长度嵌入，在推理时条件化声学模型。ElevenLabs Pro（30+ 分钟样本，9.5/10 保真）和 IVC（60 秒，8.5/10）是托管标杆；Cartesia 以 <100ms TTFB 称霸实时 Agent；F5-TTS（MIT）和 Fish Speech（CC-BY-NC）可自托管。生产必做：书面同意、审计日志、输出水印与「AI 生成语音」披露。未经同意克隆他人声音在多数法域违法。',
      en: 'Modern voice cloning is not full-model fine-tuning: a speaker encoder compresses reference audio into a fixed embedding that conditions the acoustic model at inference. ElevenLabs Pro (30+ min, 9.5/10) and IVC (60s, 8.5/10) lead hosted; Cartesia owns real-time agents at <100ms TTFB; F5-TTS (MIT) and Fish Speech (CC-BY-NC) self-host. Production must-haves: written consent, audit logs, output watermarking and "AI-generated voice" disclosure. Cloning without consent is illegal in most jurisdictions.',
      ja: '現代の音声クローンは全モデル微調整ではなく、話者エンコーダが参照音声を埋め込みに圧縮し推論時に条件付け。ElevenLabs Pro（30 分以上、9.5/10）と IVC（60 秒、8.5/10）がホスト型の基準。Cartesia は TTFB <100ms でリアルタイム agent。F5-TTS（MIT）と Fish Speech（CC-BY-NC）は自己ホスト可。本番必須：書面同意、監査ログ、透かし、「AI 生成音声」の開示。',
    },
    see: ['text-to-music', 'text-to-video', 'text-to-3d'],
  },
  {
    id: 'text-to-3d',
    term: { zh: '文生 3D (Text-to-3D)', en: 'Text-to-3D', ja: 'テキスト→3D' },
    hook: { zh: '一句话变模型', en: 'A sentence becomes a mesh', ja: '一文がメッシュになる' },
    body: {
      zh: 'AI 3D 生成把文字或图片映射为带纹理的三维网格。2026 年赛道已分化为四条主线：Tripo3D 用 ~15 秒极速草稿做概念验证；Neural4D / Rodin 用体积推理或高精度重建产出水密网格 + 4K PBR 供游戏引擎与 3D 打印；Meshy 专攻风格化四边面游戏资产；Hunyuan3D / TRELLIS 2 代表可自托管的开源路线。选型关键：要速度还是要水密？要游戏风还是写实？要 SaaS 还是要本地 GPU？',
      en: 'AI 3D generation maps text or images to textured 3D meshes. In 2026 the field splits into four lanes: Tripo3D for ~15s concept drafts; Neural4D / Rodin for watertight meshes + 4K PBR via volumetric or high-fidelity reconstruction; Meshy for stylized quad game assets; Hunyuan3D / TRELLIS 2 for self-hostable open routes. Pick by: speed or watertight? Stylized or photoreal? SaaS or local GPU?',
      ja: 'AI 3D 生成はテキストや画像をテクスチャ付き 3D メッシュに写像。2026 年は 4 路線：Tripo3D は約 15 秒ドラフト、Neural4D／Rodin は水密＋4K PBR、Meshy はスタイル化クアド、Hunyuan3D／TRELLIS 2 は自己ホスト可能なオープン路線。',
    },
    see: ['text-to-image', 'text-to-video', 'digital-human'],
  },
  {
    id: 'digital-human',
    term: { zh: '数字人 (Digital Human)', en: 'Digital Human', ja: 'デジタルヒューマン' },
    hook: { zh: '脚本驱动的虚拟主播', en: 'Script-driven virtual presenters', ja: '脚本駆動のバーチャルプレゼンター' },
    body: {
      zh: '数字人平台把脚本（或翻译后的脚本）驱动虚拟角色的口型、表情与（部分平台的）全身动作，输出讲解 / 培训 / 营销视频。HeyGen 在 175+ 语言口型同步与自拍 Instant Avatar 上综合领先；Synthesia 在企业模板、全身表演与合规文档上强项；D-ID 用轻量 API 把任意照片变成 Talking Head；Hedra 走表现力创意角色路线；Tavus 专攻销售外联的千人千面个性化。与「文生视频」（Sora / Kling）不同：数字人核心是「可控讲解」而非「自由镜头」。',
      en: 'Digital-human platforms drive a virtual character\'s lip-sync, expression and (on some platforms) full-body motion from a script — or a translated script — to produce explainers, training and marketing video. HeyGen leads overall on 175+ lip-synced languages and selfie Instant Avatars; Synthesia on enterprise templates, full-body performance and compliance docs; D-ID via a lightweight API that turns any photo into a talking head; Hedra for expressive creative characters; Tavus for per-recipient sales personalization. Unlike text-to-video (Sora/Kling), the core here is controlled presentation, not free-form cinematography.',
      ja: 'デジタルヒューマンは脚本（または翻訳脚本）でバーチャルキャラのリップシンク・表情・（一部は全身）を駆動し解説／研修／マーケ動画を出力。HeyGen は 175+ 言語と自撮り Instant Avatar で総合首位。Synthesia は企業テンプレと全身演技。D-ID は写真→Talking Head API。Hedra は表現力クリエイティブ。Tavus は営業の受信者別パーソナライズ。T2V（Sora／Kling）とは異なり「制御されたプレゼン」が核心。',
    },
    see: ['voice-clone', 'text-to-video', 'text-to-3d'],
  },
];

export const conceptMap = Object.fromEntries(concepts.map((c) => [c.id, c]));

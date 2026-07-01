import type { Loc, LinkRef } from '../lib/types';

export interface RankRow {
  rank: number;
  productId?: string;
  name: string;
  note: Loc;
  /** Numeric value used to draw the bar (benchmark lists only). */
  score?: number;
}

export interface RankList {
  id: string;
  title: Loc;
  kind: 'personal' | 'benchmark';
  intro: Loc;
  rows: RankRow[];
  /** Full-scale value for the bars (defaults to 100). */
  scoreMax?: number;
  /** Unit suffix shown on the axis hint, e.g. "%". */
  unit?: string;
  /** Source note for benchmark lists. */
  source?: Loc;
  /** Authoritative leaderboard / source links (benchmark lists). */
  sourceLinks?: LinkRef[];
}

export const rankings: RankList[] = [
  {
    id: 'my-coding-agents',
    kind: 'personal',
    title: { zh: '我的编程智能体排名', en: 'My coding-agent ranking', ja: '私のコーディングエージェント順位' },
    intro: {
      zh: '基于个人长期实战的主观排名（CLI / 平台型综合）。',
      en: 'A subjective ranking from my own long-term hands-on use (CLI / platform combined).',
      ja: '長期の実戦に基づく主観順位（CLI／プラットフォーム総合）。',
    },
    rows: [
      { rank: 1, productId: 'claude-code', name: 'Claude Code (Anthropic)', note: { zh: '推理与大改造标杆，日常主力', en: 'The bar for reasoning & big refactors; daily driver', ja: '推論と大改修の基準、日常主力' } },
      { rank: 2, productId: 'codex-cli', name: 'Codex (OpenAI)', note: { zh: 'token 精炼、沙箱安全，强力副驾', en: 'Lean & sandboxed; strong co-pilot', ja: 'トークン効率と安全性、強力な副操縦' } },
      { rank: 3, productId: 'antigravity', name: 'Antigravity (Google)', note: { zh: '多智能体并行有潜力，仍追赶中', en: 'Promising multi-agent; still catching up', ja: 'マルチエージェントに潜在力、追走中' } },
      { rank: 4, productId: 'grok-cli', name: 'Grok Build (xAI)', note: { zh: '超长上下文与速度，深度仍逊', en: 'Long context & speed; depth still behind', ja: '超長文脈と速度、深度はまだ劣る' } },
    ],
  },
  {
    id: 'my-infra',
    kind: 'personal',
    title: { zh: '我的基础设施 / harness 选择', en: 'My infra / harness picks', ja: '私の基盤／harness の選択' },
    intro: {
      zh: '自研与第三方混用：基础设施侧 OpenClaw 用得比 Hermes Agent 多；harness 侧 LangGraph/LangChain 与 Pi 各有场景。',
      en: 'A mix of self-built and third-party: on infra I use OpenClaw more than Hermes Agent; on harnesses LangGraph/LangChain and Pi each have their place.',
      ja: '自作と第三者の併用：基盤は OpenClaw を Hermes Agent より多用、harness は LangGraph/LangChain と Pi に各々の出番。',
    },
    rows: [
      { rank: 1, productId: 'openclaw', name: 'OpenClaw (self-built)', note: { zh: '自托管多模型网关，主用', en: 'Self-hosted multi-model gateway; primary', ja: '自己ホスト多モデルゲートウェイ、主力' } },
      { rank: 2, productId: 'hermes-agent', name: 'Hermes Agent (self-built)', note: { zh: '工作流自动化 agent，按需', en: 'Workflow automation agent; as needed', ja: 'ワークフロー自動化 agent、必要時' } },
      { rank: 3, productId: 'langgraph', name: 'LangGraph / LangChain', note: { zh: '学设计 + 生产编排', en: 'Learning design + production orchestration', ja: '設計学習＋本番編成' } },
      { rank: 4, productId: 'pi', name: 'Pi', note: { zh: '极简 harness，理解原理', en: 'Minimal harness; understand internals', ja: '極簡 harness、原理理解' } },
    ],
  },
  {
    id: 'terminal-bench',
    kind: 'benchmark',
    title: { zh: 'Terminal-Bench 2.1（CLI 工具执行）', en: 'Terminal-Bench 2.1 (CLI tool execution)', ja: 'Terminal-Bench 2.1（CLI ツール実行）' },
    intro: {
      zh: '衡量终端智能体在真实终端任务上的表现（含模型级与具体 agent 成绩）。',
      en: 'Measures terminal agents on real terminal tasks (model-level and named-agent scores).',
      ja: 'ターミナルエージェントの実タスク性能を測る（モデル級と個別 agent の成績を含む）。',
    },
    scoreMax: 100,
    unit: '%',
    rows: [
      { rank: 1, productId: 'claude-fable-5', name: 'Claude Fable 5 (model)', score: 88.0, note: { zh: '88.0%（模型级，登顶）', en: '88.0% (model-level, tops the board)', ja: '88.0%（モデル級、首位）' } },
      { rank: 2, productId: 'codex-cli', name: 'Codex CLI (GPT-5.5)', score: 83.4, note: { zh: '83.4%', en: '83.4%', ja: '83.4%' } },
      { rank: 3, productId: 'claude-code', name: 'Claude Code (Opus 4.8)', score: 78.9, note: { zh: '78.9%', en: '78.9%', ja: '78.9%' } },
      { rank: 4, productId: 'gemini-cli', name: 'Gemini / Antigravity (Gemini 3.1 Pro)', score: 70.7, note: { zh: '70.7%', en: '70.7%', ja: '70.7%' } },
    ],
    source: { zh: '来源：公开 Terminal-Bench 2.1 榜单（2026）。', en: 'Source: public Terminal-Bench 2.1 leaderboard (2026).', ja: '出典：公開 Terminal-Bench 2.1 リーダーボード（2026）。' },
    sourceLinks: [{ label: 'Terminal-Bench leaderboard', url: 'https://www.tbench.ai/leaderboard/terminal-bench/2.1' }],
  },
  {
    id: 'swe-bench-pro',
    kind: 'benchmark',
    title: { zh: 'SWE-bench Pro（真实 GitHub issue 修复）', en: 'SWE-bench Pro (real GitHub issue fixing)', ja: 'SWE-bench Pro（実 GitHub issue 修正）' },
    intro: {
      zh: '衡量在真实代码库修复 issue 的能力，更贴近实际工程。',
      en: 'Measures fixing real issues in real repos — closer to actual engineering.',
      ja: '実リポジトリで issue を修正する力を測る、実務に近い指標。',
    },
    scoreMax: 100,
    unit: '%',
    rows: [
      { rank: 1, productId: 'claude-fable-5', name: 'Claude Fable 5', score: 80.3, note: { zh: '80.3%（新登顶）', en: '80.3% (new leader)', ja: '80.3%（新首位）' } },
      { rank: 2, productId: 'claude-opus-48', name: 'Claude Opus 4.8', score: 69.2, note: { zh: '69.2%（领先 GPT-5.5 与 Gemini 3.1 Pro）', en: '69.2% (ahead of GPT-5.5 & Gemini 3.1 Pro)', ja: '69.2%（GPT-5.5 と Gemini 3.1 Pro を上回る）' } },
      { rank: 3, productId: 'gpt-55', name: 'GPT-5.5', score: 58.6, note: { zh: '58.6%', en: '58.6%', ja: '58.6%' } },
    ],
    source: { zh: '来源：SWE-bench Pro 公开数据（2026）。', en: 'Source: SWE-bench Pro public data (2026).', ja: '出典：SWE-bench Pro 公開データ（2026）。' },
    sourceLinks: [
      { label: 'Scale leaderboard', url: 'https://scale.com/leaderboard/swe_bench_pro_public' },
      { label: 'SWE-bench', url: 'https://www.swebench.com/' },
    ],
  },
  {
    id: 'aa-index',
    kind: 'benchmark',
    title: { zh: 'Artificial Analysis 智能指数（综合模型）', en: 'Artificial Analysis Intelligence Index (overall models)', ja: 'Artificial Analysis 知能指数（総合モデル）' },
    intro: {
      zh: '综合多基准的模型智能评分，越高越强。',
      en: 'A composite cross-benchmark model-intelligence score; higher is better.',
      ja: '複数ベンチを総合したモデル知能スコア、高いほど強い。',
    },
    scoreMax: 70,
    rows: [
      { rank: 1, productId: 'claude-opus-48', name: 'Claude Opus 4.8', score: 61.4, note: { zh: '61.4', en: '61.4', ja: '61.4' } },
      { rank: 2, productId: 'gpt-55', name: 'GPT-5.5', score: 60.2, note: { zh: '60.2', en: '60.2', ja: '60.2' } },
      { rank: 3, productId: 'claude-fable-5', name: 'Claude Fable 5', score: 60, note: { zh: '~60（安全回退拉低综合分）', en: '~60 (safety fallback caps composite)', ja: '~60（安全回退が総合を抑制）' } },
      { rank: 4, productId: 'gemini-31-pro', name: 'Gemini 3.1 Pro', score: 57, note: { zh: '~57', en: '~57', ja: '~57' } },
      { rank: 5, productId: 'grok-43', name: 'Grok 4.3', score: 53, note: { zh: '~53', en: '~53', ja: '~53' } },
    ],
    source: { zh: '来源：Artificial Analysis（2026 年 6 月）。', en: 'Source: Artificial Analysis (June 2026).', ja: '出典：Artificial Analysis（2026 年 6 月）。' },
    sourceLinks: [
      { label: 'Artificial Analysis', url: 'https://artificialanalysis.ai/' },
      { label: 'Arena (LMArena) Elo', url: 'https://arena.ai/leaderboard/' },
    ],
  },
  {
    id: 'my-music-gen',
    kind: 'personal',
    title: { zh: 'AI 音乐生成排名', en: 'AI music-generation ranking', ja: 'AI 音楽生成ランキング' },
    intro: {
      zh: '基于 2026 年公开评测与个人试用的综合排名。Suno 与 Udio 是完整歌曲的双雄；其余按场景（品牌配乐 / 古典 / 流式 BGM）分列。',
      en: 'A composite ranking from 2026 public reviews and hands-on trials. Suno and Udio are the two full-song heavyweights; the rest are ranked by use case (brand beds / classical / streaming BGM).',
      ja: '2026 年の公開レビューと試用に基づく総合順位。Suno と Udio がフルソングの二大巨頭。残りは用途別（ブランド BGM／クラシック／ストリーミング）。',
    },
    rows: [
      { rank: 1, productId: 'suno', name: 'Suno v5', note: { zh: '最易上手、完整歌曲（人声）质量标杆', en: 'Easiest on-ramp; bar for full vocal songs', ja: '最も手軽、ボーカル付きフルソングの基準' } },
      { rank: 2, productId: 'udio', name: 'Udio', note: { zh: '制作向：编曲细节、inpainting、分轨导出', en: 'Production lane: arrangement, inpainting, stems', ja: '制作向け：編曲、inpainting、ステム' } },
      { rank: 3, productId: 'elevenlabs-music', name: 'ElevenLabs Music', note: { zh: '品牌视频 + 旁白 + 配乐一站式', en: 'One-stop brand video + voiceover + score', ja: 'ブランド動画＋ナレーション＋BGM 一体' } },
      { rank: 4, productId: 'aiva', name: 'AIVA', note: { zh: '古典 / 影视配乐，MIDI 导出', en: 'Classical/cinematic scores, MIDI export', ja: 'クラシック／映像スコア、MIDI 書き出し' } },
      { rank: 5, productId: 'mubert', name: 'Mubert', note: { zh: '直播 / 应用内实时流式免版税音乐', en: 'Live/app real-time royalty-free streams', ja: 'ライブ／アプリ向けリアルタイム RF 音楽' } },
      { rank: 6, productId: 'loudly', name: 'Loudly', note: { zh: '快速背景乐、多条备选', en: 'Quick beds, many options per run', ja: 'クイック BGM、複数候補' } },
    ],
  },
  {
    id: 'my-video-gen',
    kind: 'personal',
    title: { zh: 'AI 视频生成排名', en: 'AI video-generation ranking', ja: 'AI 動画生成ランキング' },
    intro: {
      zh: '综合 Video Arena 盲测、专业工作流与性价比的主观排名。Kling v3 运动质量登顶；Sora 2 / Veo 3 是西方旗舰；Runway 仍是专业后期首选。',
      en: 'A subjective blend of Video Arena blind votes, pro workflows and value. Kling v3 tops motion quality; Sora 2 / Veo 3 are Western flagships; Runway remains the pro post-production pick.',
      ja: 'Video Arena 盲測、プロワークフロー、コスパを総合した主観順位。Kling v3 が運動品質首位。Sora 2／Veo 3 は西洋旗艦。Runway はプロ後工程の定番。',
    },
    rows: [
      { rank: 1, productId: 'kling-v3', name: 'Kling v3', note: { zh: '运动物理与物体恒常性最强', en: 'Best motion physics & object permanence', ja: '運動物理と物体恒常性が最強' } },
      { rank: 2, productId: 'sora-2', name: 'Sora 2', note: { zh: '复杂物理 + 音画同步 + Cameo', en: 'Complex physics + A/V sync + Cameo', ja: '複雑物理＋音画同期＋Cameo' } },
      { rank: 3, productId: 'veo-3', name: 'Veo 3', note: { zh: '原生音频 + Google 企业栈', en: 'Native audio + Google enterprise stack', ja: 'ネイティブ音声＋Google 企業スタック' } },
      { rank: 4, productId: 'runway-gen4', name: 'Runway Gen-4', note: { zh: '镜头控制与后期工具链最成熟', en: 'Most mature camera control & edit toolchain', ja: 'カメラ制御と編集チェーンが最成熟' } },
      { rank: 5, productId: 'ltx-2', name: 'LTX-2 Fast', note: { zh: 'Arena #2，秒价极低，适合量产试错', en: 'Arena #2, rock-bottom $/s, batch trials', ja: 'Arena 2 位、秒単価極低、量産試行向き' } },
      { rank: 6, productId: 'luma-ray2', name: 'Luma Ray2', note: { zh: '图生视频保真、迭代快', en: 'Strong I2V fidelity, fast iteration', ja: 'I2V 忠実度、高速イテレーション' } },
      { rank: 7, productId: 'seedance-2', name: 'Seedance 2.0', note: { zh: 'Arena #3，短视频量产性价比', en: 'Arena #3, short-form batch value', ja: 'Arena 3 位、ショート量産コスパ' } },
      { rank: 8, productId: 'pika', name: 'Pika 2.2', note: { zh: '社交特效玩法、门槛最低', en: 'Social effects play, lowest barrier', ja: 'SNS エフェクト、参入障壁最低' } },
    ],
  },
  {
    id: 'video-arena',
    kind: 'benchmark',
    title: { zh: 'Video Arena 盲测（文生视频）', en: 'Video Arena blind votes (text-to-video)', ja: 'Video Arena ブラインド投票（T2V）' },
    intro: {
      zh: '基于真人盲测对比（不知模型名）的 TrueSkill 保守分排名，衡量运动质量、场景连贯与提示词遵循。',
      en: 'TrueSkill conservative scores from blind human comparisons (model names hidden) — motion quality, scene coherence and prompt adherence.',
      ja: 'モデル名を隠したブラインド比較の TrueSkill 保守スコア。運動品質・シーン一貫性・プロンプト追従を測る。',
    },
    scoreMax: 2100,
    rows: [
      { rank: 1, productId: 'kling-v3', name: 'Kling v3', score: 2023, note: { zh: '2023 分（929 票，2026-07）', en: '2023 pts (929 votes, 2026-07)', ja: '2023 点（929 票、2026-07）' } },
      { rank: 2, productId: 'ltx-2', name: 'LTX-2 Fast', score: 1892, note: { zh: '1892 分，秒价最低档之一', en: '1892 pts; among the lowest $/s', ja: '1892 点、秒単価最安級' } },
      { rank: 3, productId: 'seedance-2', name: 'Seedance 2.0 Fast', score: 1780, note: { zh: '1780 分，短视频量产优选', en: '1780 pts; strong for short-form batch', ja: '1780 点、ショート量産向き' } },
    ],
    source: { zh: '来源：LLM Stats Video Arena（2026 年 7 月，929 盲测投票）。', en: 'Source: LLM Stats Video Arena (July 2026, 929 blind votes).', ja: '出典：LLM Stats Video Arena（2026 年 7 月、929 ブラインド投票）。' },
    sourceLinks: [
      { label: 'Video Arena leaderboard', url: 'https://llm-stats.com/leaderboards/best-ai-for-video-generation' },
      { label: 'Media playground', url: 'https://llm-stats.com/playground/media?type=video' },
    ],
  },
  {
    id: 'music-compare',
    kind: 'personal',
    title: { zh: '音乐生成横向对比要点', en: 'Music-gen comparison at a glance', ja: '音楽生成横断比較の要点' },
    intro: {
      zh: '不是分数榜，而是选型决策表：完整歌曲 vs 配乐 vs 古典 vs 流式，各取所长。',
      en: 'Not a scoreboard — a decision table: full songs vs beds vs classical vs streaming, each with its lane.',
      ja: 'スコア板ではなく選定表：フルソング vs BGM vs クラシック vs ストリーミング、各々の得意分野。',
    },
    rows: [
      { rank: 1, productId: 'suno', name: 'Suno', note: { zh: '完整歌曲 ★★★★★ · 易用 ★★★★★ · 分轨 ★★★ · 商用须订阅期内创作', en: 'Full songs ★★★★★ · Ease ★★★★★ · Stems ★★★ · Commercial only while subscribed', ja: 'フルソング ★★★★★ · 易用 ★★★★★ · ステム ★★★ · 商用は購読中のみ' } },
      { rank: 2, productId: 'udio', name: 'Udio', note: { zh: '完整歌曲 ★★★★★ · 易用 ★★★ · 分轨 ★★★★★ · 器乐编曲最强', en: 'Full songs ★★★★★ · Ease ★★★ · Stems ★★★★★ · Best instrumentals', ja: 'フルソング ★★★★★ · 易用 ★★★ · ステム ★★★★★ · インスト最強' } },
      { rank: 3, productId: 'elevenlabs-music', name: 'ElevenLabs Music', note: { zh: '配乐 ★★★★ · 品牌工作流 ★★★★★ · 与 TTS 一体', en: 'Beds ★★★★ · Brand workflow ★★★★★ · Unified with TTS', ja: 'BGM ★★★★ · ブランド WF ★★★★★ · TTS 一体' } },
      { rank: 4, productId: 'aiva', name: 'AIVA', note: { zh: '古典 / 影视 ★★★★★ · MIDI 导出 ★★★★★ · 无人声', en: 'Classical/film ★★★★★ · MIDI ★★★★★ · No vocals', ja: 'クラシック／映像 ★★★★★ · MIDI ★★★★★ · ボーカルなし' } },
      { rank: 5, productId: 'mubert', name: 'Mubert', note: { zh: '流式 BGM ★★★★★ · 免版税 ★★★★ · 不适合完整歌曲', en: 'Streaming BGM ★★★★★ · Royalty-free ★★★★ · Not for full songs', ja: 'ストリーム BGM ★★★★★ · RF ★★★★ · フルソング不向き' } },
    ],
  },
  {
    id: 'my-image-gen',
    kind: 'personal',
    title: { zh: 'AI 图像生成排名', en: 'AI image-generation ranking', ja: 'AI 画像生成ランキング' },
    intro: {
      zh: '综合 Image Arena 盲测、美学主观评价与工作流实用性的排名。GPT Image 2 公榜第一；Midjourney 仍是「好看」首选；Flux 是开源系标杆。',
      en: 'A blend of Image Arena blind votes, subjective aesthetics and workflow practicality. GPT Image 2 tops the public board; Midjourney still wins "beautiful"; Flux leads the open family.',
      ja: 'Image Arena 盲測、主観的美学、ワークフロー実用性を総合。GPT Image 2 が公榜首位。Midjourney は「美しい」の定番。Flux がオープン系の基準。',
    },
    rows: [
      { rank: 1, productId: 'gpt-image-2', name: 'GPT Image 2', note: { zh: 'Image Arena Elo 1339，公榜第一', en: 'Image Arena Elo 1339, public #1', ja: 'Image Arena Elo 1339、公榜首位' } },
      { rank: 2, productId: 'midjourney', name: 'Midjourney v7', note: { zh: '美学与风格化主观首选', en: 'Subjective pick for aesthetics & style', ja: '美学・スタイル化の主観的首位' } },
      { rank: 3, productId: 'flux-pro', name: 'Flux Pro / Flux 2', note: { zh: '开源系旗舰，ComfyUI 生态', en: 'Open-family flagship, ComfyUI ecosystem', ja: 'オープン系旗艦、ComfyUI 生態系' } },
      { rank: 4, productId: 'ideogram-4', name: 'Ideogram 4.0', note: { zh: '图内文字渲染最准', en: 'Most accurate in-image text', ja: '画像内文字が最も正確' } },
      { rank: 5, productId: 'gemini-image', name: 'Gemini Image', note: { zh: 'Google 多模态一体、高性价比', en: 'Google multimodal-native, great value', ja: 'Google 多モーダル一体、高コスパ' } },
      { rank: 6, productId: 'stable-diffusion-35', name: 'SD 3.5', note: { zh: '插件 / LoRA 生态最庞大', en: 'Largest plugin / LoRA ecosystem', ja: 'プラグイン／LoRA 生態系最大' } },
      { rank: 7, productId: 'recraft', name: 'Recraft V3', note: { zh: '矢量 / 品牌设计专用', en: 'Vector / brand-design specialist', ja: 'ベクター／ブランドデザイン専用' } },
    ],
  },
  {
    id: 'image-arena',
    kind: 'benchmark',
    title: { zh: 'Image Arena Elo（文生图盲测）', en: 'Image Arena Elo (text-to-image blind votes)', ja: 'Image Arena Elo（T2I ブラインド投票）' },
    intro: {
      zh: 'Artificial Analysis 盲测对比排名：用户不知模型名，对同一提示词的两张图投票。Elo 越高越常被偏好。',
      en: 'Artificial Analysis blind comparisons: users vote between two images from the same prompt without seeing model names. Higher Elo = preferred more often.',
      ja: 'Artificial Analysis ブラインド比較。同一プロンプトの 2 画像をモデル名非表示で投票。Elo が高いほど選ばれやすい。',
    },
    scoreMax: 1400,
    rows: [
      { rank: 1, productId: 'gpt-image-2', name: 'GPT Image 2 (high)', score: 1339, note: { zh: 'Elo 1339（12,562+ 对比）', en: 'Elo 1339 (12,562+ comparisons)', ja: 'Elo 1339（12,562+ 比較）' } },
      { rank: 2, productId: 'gemini-image', name: 'Nano Banana 2 (Gemini 3.1 Flash Image)', score: 1254, note: { zh: 'Elo 1254', en: 'Elo 1254', ja: 'Elo 1254' } },
      { rank: 3, productId: 'flux-pro', name: 'Cosmos3 / open-weights leader', score: 1224, note: { zh: '开源权重榜首 Elo ~1224', en: 'Open-weights leader Elo ~1224', ja: 'オープンウェイト首位 Elo 約 1224' } },
    ],
    source: { zh: '来源：Artificial Analysis Image Arena（2026）。', en: 'Source: Artificial Analysis Image Arena (2026).', ja: '出典：Artificial Analysis Image Arena（2026）。' },
    sourceLinks: [
      { label: 'Text-to-Image Leaderboard', url: 'https://artificialanalysis.ai/image/leaderboard/text-to-image' },
      { label: 'Image Arena', url: 'https://artificialanalysis.ai/image/arena' },
    ],
  },
  {
    id: 'my-voice-clone',
    kind: 'personal',
    title: { zh: '语音克隆 / TTS 排名', en: 'Voice cloning / TTS ranking', ja: '音声クローン／TTS ランキング' },
    intro: {
      zh: '按场景分列：高保真配音、即时克隆、实时流式 Agent、企业合规、开源自托管。未经同意克隆他人声音在多数司法管辖区违法。',
      en: 'Ranked by scenario: high-fidelity dubbing, instant clone, real-time agent streaming, enterprise compliance, open self-host. Cloning without consent is illegal in most jurisdictions.',
      ja: '用途別：高忠実度吹替、即時クローン、リアルタイム agent、企業コンプライアンス、オープン自己ホスト。無断クローンは多くの法域で違法。',
    },
    rows: [
      { rank: 1, productId: 'elevenlabs-tts', name: 'ElevenLabs', note: { zh: '保真度与 API 生态全面第一', en: 'Top fidelity and broadest API stack', ja: '忠実度と API 生態系で全面首位' } },
      { rank: 2, productId: 'playht', name: 'PlayHT 3.0', note: { zh: '即时克隆 9/10，Meta 生态潜力', en: 'Instant clone 9/10, Meta ecosystem upside', ja: '即時クローン 9/10、Meta 生態系' } },
      { rank: 3, productId: 'cartesia', name: 'Cartesia Sonic', note: { zh: '流式 TTFB <100ms，语音 Agent 首选', en: 'Streaming TTFB <100ms, voice-agent pick', ja: 'ストリーム TTFB <100ms、音声 agent 定番' } },
      { rank: 4, productId: 'fish-speech', name: 'Fish Speech', note: { zh: '开源克隆，中英文强（CC-BY-NC）', en: 'Open clone, strong CN/EN (CC-BY-NC)', ja: 'オープンクローン、中英語強（CC-BY-NC）' } },
      { rank: 5, productId: 'f5-tts', name: 'F5-TTS', note: { zh: 'MIT 可商用自托管', en: 'MIT commercial self-host', ja: 'MIT 商用自己ホスト可' } },
      { rank: 6, productId: 'google-chirp3', name: 'Google Chirp 3 HD', note: { zh: 'GCP 企业合规 Custom Voice', en: 'GCP enterprise-compliant Custom Voice', ja: 'GCP 企業コンプライアンス Custom Voice' } },
    ],
  },
  {
    id: 'voice-compare',
    kind: 'personal',
    title: { zh: '语音克隆横向对比要点', en: 'Voice-clone comparison at a glance', ja: '音声クローン横断比較の要点' },
    intro: {
      zh: '选型决策表：保真度 vs 延迟 vs 样本时长 vs 许可。生产环境须备书面同意与输出披露。',
      en: 'Decision table: fidelity vs latency vs sample length vs license. Production needs written consent and output disclosure.',
      ja: '選定表：忠実度 vs 遅延 vs サンプル長 vs ライセンス。本番は書面同意と出力開示が必須。',
    },
    rows: [
      { rank: 1, productId: 'elevenlabs-tts', name: 'ElevenLabs', note: { zh: '保真 ★★★★★ · 延迟 ★★★★ · 样本 60s(IVC)/30min(Pro) · 同意验证 ✓', en: 'Fidelity ★★★★★ · Latency ★★★★ · Sample 60s(IVC)/30min(Pro) · Consent ✓', ja: '忠実 ★★★★★ · 遅延 ★★★★ · 60s(IVC)/30min(Pro) · 同意 ✓' } },
      { rank: 2, productId: 'playht', name: 'PlayHT 3.0', note: { zh: '保真 ★★★★★ · 延迟 ★★★★ · 样本 30–60s · 身份验证 ✓', en: 'Fidelity ★★★★★ · Latency ★★★★ · Sample 30–60s · ID verify ✓', ja: '忠実 ★★★★★ · 遅延 ★★★★ · 30–60s · 本人確認 ✓' } },
      { rank: 3, productId: 'cartesia', name: 'Cartesia', note: { zh: '保真 ★★★★ · 延迟 ★★★★★(<100ms) · 样本 15s · Agent 首选', en: 'Fidelity ★★★★ · Latency ★★★★★(<100ms) · Sample 15s · Agent pick', ja: '忠実 ★★★★ · 遅延 ★★★★★(<100ms) · 15s · agent 向き' } },
      { rank: 4, productId: 'f5-tts', name: 'F5-TTS', note: { zh: '保真 ★★★★ · 延迟 ★★★ · 样本 10s · MIT 可商用自托管', en: 'Fidelity ★★★★ · Latency ★★★ · Sample 10s · MIT commercial self-host', ja: '忠実 ★★★★ · 遅延 ★★★ · 10s · MIT 商用可' } },
      { rank: 5, productId: 'google-chirp3', name: 'Chirp 3 HD', note: { zh: '保真 ★★★ · 延迟 ★★★★ · 样本 10s · GCP 企业合规', en: 'Fidelity ★★★ · Latency ★★★★ · Sample 10s · GCP enterprise', ja: '忠実 ★★★ · 遅延 ★★★★ · 10s · GCP 企業' } },
    ],
  },
  {
    id: 'image-compare',
    kind: 'personal',
    title: { zh: '图像生成横向对比要点', en: 'Image-gen comparison at a glance', ja: '画像生成横断比較の要点' },
    intro: {
      zh: '选型决策表：公榜质量 vs 美学 vs 文字渲染 vs 开源自托管 vs 矢量设计。',
      en: 'Decision table: public-board quality vs aesthetics vs text rendering vs open self-host vs vector design.',
      ja: '選定表：公榜品質 vs 美学 vs 文字描画 vs オープン自己ホスト vs ベクター。',
    },
    rows: [
      { rank: 1, productId: 'gpt-image-2', name: 'GPT Image 2', note: { zh: 'Arena Elo ★★★★★ · 写实 ★★★★★ · 开源 ✗ · 文字 ★★★★', en: 'Arena Elo ★★★★★ · Photoreal ★★★★★ · Open ✗ · Text ★★★★', ja: 'Arena Elo ★★★★★ · フォトリアル ★★★★★ · OSS ✗ · 文字 ★★★★' } },
      { rank: 2, productId: 'midjourney', name: 'Midjourney v7', note: { zh: '美学 ★★★★★ · 写实 ★★★★ · 开源 ✗ · 社区风格库 ★★★★★', en: 'Aesthetics ★★★★★ · Photoreal ★★★★ · Open ✗ · Style refs ★★★★★', ja: '美学 ★★★★★ · フォトリアル ★★★★ · OSS ✗ · スタイル参照 ★★★★★' } },
      { rank: 3, productId: 'flux-pro', name: 'Flux 2 / Pro', note: { zh: 'Arena ★★★★★ · 自托管 ★★★★★ · ComfyUI ★★★★★', en: 'Arena ★★★★★ · Self-host ★★★★★ · ComfyUI ★★★★★', ja: 'Arena ★★★★★ · 自己ホスト ★★★★★ · ComfyUI ★★★★★' } },
      { rank: 4, productId: 'ideogram-4', name: 'Ideogram 4.0', note: { zh: '文字渲染 ★★★★★ · 海报 / 电商 ★★★★★', en: 'Text rendering ★★★★★ · Poster/e-com ★★★★★', ja: '文字描画 ★★★★★ · ポスター／EC ★★★★★' } },
      { rank: 5, productId: 'recraft', name: 'Recraft V3', note: { zh: '矢量 SVG ★★★★★ · 品牌一致 ★★★★★', en: 'Vector SVG ★★★★★ · Brand consistency ★★★★★', ja: 'ベクター SVG ★★★★★ · ブランド一貫 ★★★★★' } },
    ],
  },
  {
    id: 'my-3d-gen',
    kind: 'personal',
    title: { zh: 'AI 3D 生成排名', en: 'AI 3D-generation ranking', ja: 'AI 3D 生成ランキング' },
    intro: {
      zh: '按场景分列：极速草稿（Tripo）→ 生产就绪水密（Neural4D）→ 游戏风格（Meshy）→ 高细节（Rodin）→ 开源自托管（Hunyuan3D / TRELLIS）。',
      en: 'Ranked by scenario: ultra-fast drafts (Tripo) → production watertight (Neural4D) → stylized games (Meshy) → high detail (Rodin) → open self-host (Hunyuan3D / TRELLIS).',
      ja: '用途別：超高速ドラフト（Tripo）→ 本番水密（Neural4D）→ ゲームスタイル（Meshy）→ 高詳細（Rodin）→ オープン自己ホスト（Hunyuan3D／TRELLIS）。',
    },
    rows: [
      { rank: 1, productId: 'neural4d', name: 'Neural4D', note: { zh: '水密 + 4K PBR + 全格式导出，生产管线首选', en: 'Watertight + 4K PBR + broad exports; production pick', ja: '水密＋4K PBR＋全形式書き出し、本番定番' } },
      { rank: 2, productId: 'tripo3d', name: 'Tripo3D', note: { zh: '~15 秒极速草稿，概念验证之王', en: '~15s drafts; king of concept validation', ja: '約 15 秒ドラフト、コンセプト検証の王' } },
      { rank: 3, productId: 'meshy', name: 'Meshy', note: { zh: '风格化游戏资产，四边面 + PBR', en: 'Stylized game assets, quads + PBR', ja: 'スタイル化ゲーム資産、クアド＋PBR' } },
      { rank: 4, productId: 'rodin-hyper3d', name: 'Rodin', note: { zh: '10 万面 + 4K 写实，SLA 打印', en: '100k polys + 4K photoreal, SLA print', ja: '10 万面＋4K フォトリアル、SLA 印刷' } },
      { rank: 5, productId: 'hunyuan3d', name: 'Hunyuan3D 2.0', note: { zh: '开源 + 腾讯云，中文生态', en: 'Open weights + Tencent Cloud, Chinese ecosystem', ja: 'オープン＋Tencent Cloud、中国語生態系' } },
      { rank: 6, productId: 'trellis-2', name: 'TRELLIS 2', note: { zh: '微软开源研究，几何质量强', en: 'Microsoft open research, strong geometry', ja: 'Microsoft オープン研究、幾何品質強い' } },
    ],
  },
  {
    id: '3d-compare',
    kind: 'personal',
    title: { zh: '3D 生成横向对比要点', en: '3D-gen comparison at a glance', ja: '3D 生成横断比較の要点' },
    intro: {
      zh: '选型决策表：速度 vs 水密可打印 vs PBR vs 游戏风 vs 开源。',
      en: 'Decision table: speed vs watertight printability vs PBR vs game style vs open source.',
      ja: '選定表：速度 vs 水密印刷 vs PBR vs ゲーム風 vs オープン。',
    },
    rows: [
      { rank: 1, productId: 'tripo3d', name: 'Tripo3D', note: { zh: '速度 ★★★★★(~15s) · 水密 ✗ · PBR ★★ · 价格 ★★★★', en: 'Speed ★★★★★(~15s) · Watertight ✗ · PBR ★★ · Price ★★★★', ja: '速度 ★★★★★(約15s) · 水密 ✗ · PBR ★★ · 価格 ★★★★' } },
      { rank: 2, productId: 'neural4d', name: 'Neural4D', note: { zh: '速度 ★★★★(~90s) · 水密 ★★★★★ · PBR ★★★★★(4K) · 导出 ★★★★★', en: 'Speed ★★★★(~90s) · Watertight ★★★★★ · PBR ★★★★★ · Export ★★★★★', ja: '速度 ★★★★(約90s) · 水密 ★★★★★ · PBR ★★★★★ · 書き出し ★★★★★' } },
      { rank: 3, productId: 'meshy', name: 'Meshy', note: { zh: '游戏风 ★★★★★ · 四边面 ★★★★★ · 水密 ★★★ · $20/月', en: 'Game style ★★★★★ · Quads ★★★★★ · Watertight ★★★ · $20/mo', ja: 'ゲーム風 ★★★★★ · クアド ★★★★★ · 水密 ★★★ · $20/月' } },
      { rank: 4, productId: 'rodin-hyper3d', name: 'Rodin', note: { zh: '细节 ★★★★★ · 速度 ★★(~300s) · 水密 ★★★★★ · PBR 4K', en: 'Detail ★★★★★ · Speed ★★(~300s) · Watertight ★★★★★ · PBR 4K', ja: '詳細 ★★★★★ · 速度 ★★(約300s) · 水密 ★★★★★ · PBR 4K' } },
      { rank: 5, productId: 'hunyuan3d', name: 'Hunyuan3D', note: { zh: '开源 ★★★★★ · 自托管 ★★★★★ · 中文 ★★★★★', en: 'Open ★★★★★ · Self-host ★★★★★ · Chinese ★★★★★', ja: 'OSS ★★★★★ · 自己ホスト ★★★★★ · 中国語 ★★★★★' } },
    ],
  },
  {
    id: 'my-avatar-gen',
    kind: 'personal',
    title: { zh: '数字人 / Avatar 排名', en: 'Digital-human / avatar ranking', ja: 'デジタルヒューマン／Avatar ランキング' },
    intro: {
      zh: '综合 2026 年实测与公开评测：HeyGen 综合第一；Synthesia 企业培训；D-ID 开发者 API；其余按创意 / L&D / 销售个性化分列。',
      en: 'Blending 2026 hands-on tests and public reviews: HeyGen overall #1; Synthesia for enterprise training; D-ID for dev APIs; the rest by creative / L&D / sales personalization.',
      ja: '2026 年の実測と公開レビューを総合。HeyGen が総合首位。Synthesia は企業研修。D-ID は開発者 API。残りはクリエイティブ／L&D／営業パーソナライズ別。',
    },
    rows: [
      { rank: 1, productId: 'heygen', name: 'HeyGen', note: { zh: '175+ 语言、自拍 Avatar、Video Agent', en: '175+ langs, selfie avatar, Video Agent', ja: '175+ 言語、自撮り Avatar、Video Agent' } },
      { rank: 2, productId: 'synthesia', name: 'Synthesia', note: { zh: '全身动作、企业模板、合规文档', en: 'Full-body motion, enterprise templates, compliance', ja: '全身モーション、企業テンプレ、コンプライアンス' } },
      { rank: 3, productId: 'did', name: 'D-ID', note: { zh: '照片 60 秒变说话头，API 首选', en: 'Photo to talking head in 60s; API pick', ja: '写真 60 秒で Talking Head、API 定番' } },
      { rank: 4, productId: 'hedra', name: 'Hedra Character-3', note: { zh: '表现力与创意角色动画', en: 'Expressiveness and creative character animation', ja: '表現力とクリエイティブキャラアニメ' } },
      { rank: 5, productId: 'tavus', name: 'Tavus', note: { zh: '千人千面销售 / 招聘个性化', en: 'Per-recipient sales/recruiting personalization', ja: '受信者別営業／採用パーソナライズ' } },
      { rank: 6, productId: 'colossyan', name: 'Colossyan', note: { zh: '分支培训 + Business 档 SCORM', en: 'Branching training + SCORM on Business', ja: '分岐研修＋Business で SCORM' } },
    ],
  },
  {
    id: 'avatar-compare',
    kind: 'personal',
    title: { zh: '数字人横向对比要点', en: 'Avatar comparison at a glance', ja: 'デジタルヒューマン横断比較の要点' },
    intro: {
      zh: '选型决策表：多语言 vs 企业合规 vs API vs 创意表现力 vs 销售个性化。',
      en: 'Decision table: multilingual vs enterprise compliance vs API vs creative expression vs sales personalization.',
      ja: '選定表：多言語 vs 企業コンプライアンス vs API vs クリエイティブ表現 vs 営業パーソナライズ。',
    },
    rows: [
      { rank: 1, productId: 'heygen', name: 'HeyGen', note: { zh: '语言 ★★★★★(175+) · 口型 ★★★★★ · 易用 ★★★★★ · $24/月', en: 'Langs ★★★★★(175+) · Lip-sync ★★★★★ · Ease ★★★★★ · $24/mo', ja: '言語 ★★★★★(175+) · リップ ★★★★★ · 易用 ★★★★★ · $24/月' } },
      { rank: 2, productId: 'synthesia', name: 'Synthesia', note: { zh: '全身 ★★★★★ · 企业 ★★★★★ · SCORM 需 Enterprise', en: 'Full-body ★★★★★ · Enterprise ★★★★★ · SCORM needs Enterprise', ja: '全身 ★★★★★ · 企業 ★★★★★ · SCORM は Enterprise 要' } },
      { rank: 3, productId: 'did', name: 'D-ID', note: { zh: 'API ★★★★★ · 照片驱动 ★★★★★ · 语言 ★★(~29)', en: 'API ★★★★★ · Photo drive ★★★★★ · Langs ★★(~29)', ja: 'API ★★★★★ · 写真駆動 ★★★★★ · 言語 ★★(約29)' } },
      { rank: 4, productId: 'hedra', name: 'Hedra', note: { zh: '表现力 ★★★★★ · 创意 ★★★★★ · 企业工作流 ★★', en: 'Expression ★★★★★ · Creative ★★★★★ · Enterprise WF ★★', ja: '表現力 ★★★★★ · クリエイティブ ★★★★★ · 企業 WF ★★' } },
      { rank: 5, productId: 'tavus', name: 'Tavus', note: { zh: '个性化量产 ★★★★★ · CRM ★★★★★ · 通用培训 ★★', en: 'Personalization ★★★★★ · CRM ★★★★★ · General training ★★', ja: 'パーソナライズ量産 ★★★★★ · CRM ★★★★★ · 汎用研修 ★★' } },
    ],
  },
];

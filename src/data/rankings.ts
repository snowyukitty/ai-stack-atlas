import type { Loc } from '../lib/types';

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
  },
];

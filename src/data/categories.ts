import type { Category } from '../lib/types';

export const categories: Category[] = [
  {
    id: 'coding-cli',
    icon: '⌨️',
    name: { zh: '编程智能体 · 终端 / CLI', en: 'Coding Agents · Terminal / CLI', ja: 'コーディングエージェント · CLI' },
    short: { zh: 'CLI 编程智能体', en: 'CLI coding agents', ja: 'CLI エージェント' },
    blurb: {
      zh: '跑在终端里的自主编程智能体：读写文件、执行命令、跑测试、改代码。当下竞争最激烈的赛道。',
      en: 'Autonomous coding agents that live in your terminal — read/write files, run commands, run tests, edit code. The hottest battleground right now.',
      ja: 'ターミナル上で動く自律コーディングエージェント。ファイル操作・コマンド実行・テスト・コード編集を行う、今最も競争が激しい領域。',
    },
  },
  {
    id: 'coding-ide',
    icon: '🧩',
    name: { zh: '编程智能体 · IDE / 平台', en: 'Coding Agents · IDE / Platform', ja: 'コーディングエージェント · IDE / プラットフォーム' },
    short: { zh: 'IDE / 平台', en: 'IDE / platform', ja: 'IDE / プラットフォーム' },
    blurb: {
      zh: '编辑器内或独立的图形化智能体平台：补全、内联编辑、多智能体编排、可视化审阅。',
      en: 'Editor-embedded or standalone graphical agent platforms — completion, inline edits, multi-agent orchestration, visual review.',
      ja: 'エディタ統合型または独立型の GUI エージェント基盤。補完・インライン編集・マルチエージェント編成・可視化レビュー。',
    },
  },
  {
    id: 'app-builder',
    icon: '🪄',
    name: { zh: 'AI 应用生成器', en: 'AI App Builders', ja: 'AI アプリビルダー' },
    short: { zh: '应用生成器', en: 'App builders', ja: 'アプリビルダー' },
    blurb: {
      zh: '从一句话或一张图生成可运行的全栈 / 前端应用，面向快速原型与非专业开发者。',
      en: 'Turn a prompt or a screenshot into a running full-stack / frontend app. Aimed at rapid prototyping and non-developers.',
      ja: '一文やスクショから動くフルスタック／フロントエンドアプリを生成。高速プロトタイピングと非開発者向け。',
    },
  },
  {
    id: 'framework',
    icon: '🏗️',
    name: { zh: 'Agent 框架 / Harness', en: 'Agent Frameworks / Harnesses', ja: 'Agent フレームワーク / Harness' },
    short: { zh: '框架 / Harness', en: 'Frameworks', ja: 'フレームワーク' },
    blurb: {
      zh: '用来「自己造」智能体的库与运行时：编排循环、工具调用、状态、记忆、多智能体协作。',
      en: 'Libraries & runtimes for building your own agents — orchestration loops, tool calling, state, memory, multi-agent collaboration.',
      ja: '自分でエージェントを作るためのライブラリ／ランタイム。編成ループ・ツール呼び出し・状態・記憶・マルチエージェント連携。',
    },
  },
  {
    id: 'infra',
    icon: '🛠️',
    name: { zh: 'Agent 基础设施', en: 'Agent Infrastructure', ja: 'Agent 基盤' },
    short: { zh: '基础设施', en: 'Infrastructure', ja: '基盤' },
    blurb: {
      zh: '把智能体跑起来、管起来的底座：网关 / 路由、运行时沙箱、可观测性、评测、部署。',
      en: 'The substrate that runs and governs agents — gateways/routing, runtime sandboxes, observability, eval, deployment.',
      ja: 'エージェントを動かし管理する土台。ゲートウェイ／ルーティング・サンドボックス・可観測性・評価・デプロイ。',
    },
  },
  {
    id: 'model',
    icon: '🧠',
    name: { zh: '基础模型', en: 'Foundation Models', ja: '基盤モデル' },
    short: { zh: '模型', en: 'Models', ja: 'モデル' },
    blurb: {
      zh: '一切之上的「大脑」。这里只收录与编程 / agent 场景最相关的前沿模型。',
      en: 'The "brain" everything else sits on. Only the frontier models most relevant to coding / agentic use are listed.',
      ja: 'すべての土台となる「脳」。コーディング／エージェント用途に最も関連するフロンティアモデルのみ掲載。',
    },
  },
];

export const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c]));

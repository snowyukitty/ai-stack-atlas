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
  {
    id: 'music-gen',
    icon: '🎵',
    name: { zh: 'AI 音乐生成', en: 'AI Music Generation', ja: 'AI 音楽生成' },
    short: { zh: '音乐生成', en: 'Music gen', ja: '音楽生成' },
    blurb: {
      zh: '从文字提示生成完整歌曲、伴奏或配乐：人声演唱、编曲、分轨导出与商用授权各平台差异大。',
      en: 'Turn text prompts into full songs, instrumentals or scores — vocals, arrangement, stem export and commercial rights vary widely by platform.',
      ja: 'テキストからフルソング・インスト・スコアを生成。ボーカル、編曲、ステム書き出し、商用権はプラットフォームごとに大きく異なる。',
    },
  },
  {
    id: 'video-gen',
    icon: '🎬',
    name: { zh: 'AI 视频生成', en: 'AI Video Generation', ja: 'AI 動画生成' },
    short: { zh: '视频生成', en: 'Video gen', ja: '動画生成' },
    blurb: {
      zh: '文生视频、图生视频与视频编辑：运动物理、时序一致性、音画同步是拉开差距的关键维度。',
      en: 'Text-to-video, image-to-video and video editing — motion physics, temporal consistency and audio sync are where models separate.',
      ja: 'テキスト→動画、画像→動画、動画編集。運動物理・時間的一貫性・音画同期が差を生む。',
    },
  },
  {
    id: 'image-gen',
    icon: '🖼️',
    name: { zh: 'AI 图像生成', en: 'AI Image Generation', ja: 'AI 画像生成' },
    short: { zh: '图像生成', en: 'Image gen', ja: '画像生成' },
    blurb: {
      zh: '文生图、图生图与图像编辑：美学风格、文字渲染准确度、开源可自托管是主要分叉。',
      en: 'Text-to-image, image-to-image and editing — aesthetic style, text rendering accuracy and open self-hosting are the main forks.',
      ja: 'テキスト→画像、画像→画像、画像編集。美学、テキスト描画精度、オープン自己ホストが主な分岐。',
    },
  },
  {
    id: 'voice-clone',
    icon: '🎙️',
    name: { zh: '语音克隆 / TTS', en: 'Voice Cloning / TTS', ja: '音声クローン / TTS' },
    short: { zh: '语音克隆', en: 'Voice clone', ja: '音声クローン' },
    blurb: {
      zh: '从短样本克隆人声并合成语音：保真度、流式延迟、同意验证与自托管选项差异巨大。',
      en: 'Clone a voice from a short sample and synthesize speech — fidelity, streaming latency, consent checks and self-host options vary hugely.',
      ja: '短いサンプルから声をクローンし音声合成。忠実度、ストリーミング遅延、同意検証、自己ホストの有無で大きく異なる。',
    },
  },
  {
    id: '3d-gen',
    icon: '🧊',
    name: { zh: 'AI 3D 生成', en: 'AI 3D Generation', ja: 'AI 3D 生成' },
    short: { zh: '3D 生成', en: '3D gen', ja: '3D 生成' },
    blurb: {
      zh: '文生 3D、图生 3D 与纹理烘焙：速度、拓扑质量、PBR 材质、水密可打印性是核心分叉。',
      en: 'Text-to-3D, image-to-3D and texture baking — speed, mesh topology, PBR materials and watertight printability are the main forks.',
      ja: 'テキスト→3D、画像→3D、テクスチャベイク。速度、メッシュトポロジ、PBR 材質、水密印刷適性が主な分岐。',
    },
  },
  {
    id: 'avatar-gen',
    icon: '👤',
    name: { zh: '数字人 / AI Avatar', en: 'Digital Humans / AI Avatars', ja: 'デジタルヒューマン / AI Avatar' },
    short: { zh: '数字人', en: 'Avatars', ja: 'デジタルヒューマン' },
    blurb: {
      zh: '脚本驱动的虚拟主播与讲解视频：口型同步、多语言翻译、自定义形象与企业合规是选型关键。',
      en: 'Script-driven virtual presenters and explainer videos — lip-sync, multilingual translation, custom likeness and enterprise compliance matter most.',
      ja: '脚本駆動のバーチャルプレゼンターと解説動画。リップシンク、多言語翻訳、カスタム外見、企業コンプライアンスが選定の要。',
    },
  },
];

export const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c]));

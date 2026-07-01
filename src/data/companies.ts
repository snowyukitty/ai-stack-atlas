import type { Loc, LinkRef } from '../lib/types';

/** Weights / openness stance. */
export type Stance = 'closed' | 'open' | 'hybrid';

export interface Company {
  id: string;
  name: string;
  /** Emoji flag of HQ country. */
  flag: string;
  country: Loc;
  /** Founding year of the lab / AI effort. */
  founded: number;
  stance: Stance;
  /** Short valuation / status string for the matrix. */
  valuation: string;
  valuationNote: Loc;
  /** Flagship model line (proper nouns). */
  flagship: string;
  /** Short focus tag for the matrix. */
  focus: Loc;
  /** One-line hook. */
  oneLiner: Loc;
  /** Deeper analysis paragraph. */
  analysis: Loc;
  strengths: Loc[];
  /** Risks / what to watch. */
  watch: Loc[];
  positioning: Loc;
  /** Catalog product ids made by this company (deep-link to cards). */
  productIds: string[];
  links: LinkRef[];
  /** Left-border accent colour. */
  accent: string;
}

const US: Loc = { zh: '美国', en: 'United States', ja: 'アメリカ' };
const CN: Loc = { zh: '中国', en: 'China', ja: '中国' };
const FR: Loc = { zh: '法国', en: 'France', ja: 'フランス' };

/**
 * Deep dives on the companies behind the stack — because the company (its
 * incentives, governance, compute and business model) is the most fundamental
 * layer of all. Figures are public 2026 snapshots and move fast.
 */
export const companies: Company[] = [
  {
    id: 'anthropic',
    name: 'Anthropic',
    flag: '🇺🇸',
    country: US,
    founded: 2021,
    stance: 'closed',
    valuation: '≈$965B',
    valuationNote: { zh: '2026-06 申请 IPO（Series H 后）', en: 'IPO filed Jun 2026 (post Series H)', ja: 'IPO 申請 2026-06（Series H 後）' },
    flagship: 'Claude Opus 4.8 · Fable 5',
    focus: { zh: '安全优先前沿 · 编程 / agent', en: 'Safety-first frontier · coding/agents', ja: '安全優先フロンティア · コーディング/agent' },
    oneLiner: {
      zh: '以安全为先的前沿实验室，把 Claude 做成了企业编程的默认选择。',
      en: 'The safety-first frontier lab that made Claude the enterprise-coding default.',
      ja: '安全第一のフロンティアラボ。Claude を企業コーディングの定番にした。',
    },
    analysis: {
      zh: '2021 年由前 OpenAI 研究者创立，以「公益公司」(PBC) 架构运营，把前沿能力与明确的安全 / 可解释性使命绑进治理。Claude Code 成为增长引擎——约 470 亿美元年化营收、企业编程市场约 54% 份额——并于 2026 年中以约 9650 亿美元估值申请 IPO。',
      en: 'Founded in 2021 by ex-OpenAI researchers and run as a Public Benefit Corporation, Anthropic wires a safety/interpretability mission into governance. Claude Code became its growth engine — ~$47B run-rate revenue and a reported ~54% of the enterprise coding market — and it filed to IPO at a ~$965B valuation in mid-2026.',
      ja: '2021 年に元 OpenAI の研究者が設立、PBC（公益企業）として運営し、安全/解釈性の使命を統治に組み込む。Claude Code が成長エンジンとなり（年換算約 470 億ドル、企業コーディング市場の約 54%）、2026 年半ばに約 9650 億ドル評価で IPO 申請。',
    },
    strengths: [
      { zh: '编程 / agent 可靠性一流', en: 'Best-in-class coding/agentic reliability', ja: 'コーディング/agent の信頼性が一流' },
      { zh: '把安全 / 可解释性写进治理，而非公关', en: 'Safety & interpretability as governance, not PR', ja: '安全・解釈性を統治に組み込む' },
    ],
    watch: [
      { zh: '定价偏高、对算力依赖重', en: 'Premium pricing; heavy compute dependence', ja: '高価格・計算資源への依存' },
      { zh: '营收高度集中在编程场景', en: 'Revenue concentrated in coding', ja: '収益がコーディングに集中' },
    ],
    positioning: { zh: '前沿能力 + 最强安全姿态。', en: 'Frontier capability with the strongest safety posture.', ja: 'フロンティア能力＋最強の安全姿勢。' },
    productIds: ['claude-code', 'claude-fable-5', 'claude-opus-48'],
    links: [
      { label: 'anthropic.com', url: 'https://www.anthropic.com' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Anthropic' },
    ],
    accent: '#d97757',
  },
  {
    id: 'openai',
    name: 'OpenAI',
    flag: '🇺🇸',
    country: US,
    founded: 2015,
    stance: 'closed',
    valuation: '≈$852B',
    valuationNote: { zh: '2026-06 提交 S-1', en: 'S-1 filed Jun 2026', ja: 'S-1 提出 2026-06' },
    flagship: 'GPT-5.5 · Codex',
    focus: { zh: '消费级规模 + 企业', en: 'Consumer scale + enterprise', ja: '消費者規模＋エンタープライズ' },
    oneLiner: {
      zh: '把 AI 带入主流的公司，如今全力把编程与企业市场变现。',
      en: 'The company that mainstreamed AI; now racing to monetize coding & enterprise.',
      ja: 'AI を主流化した企業。今はコーディングと企業市場の収益化を急ぐ。',
    },
    analysis: {
      zh: '2015 年作为非营利创立，2025 年底重组为「营利型公益公司」(非营利基金会持股约 26%)。凭 ChatGPT 拥有最广的消费触达，年化营收约 250 亿美元，2026 年中以约 8520 亿美元估值提交 S-1，并把重心收回到编程 (Codex) 与企业。',
      en: 'Founded in 2015 as a non-profit, OpenAI restructured in late 2025 into a for-profit PBC (the non-profit holds ~26%). With the widest consumer reach (ChatGPT) it hit ~$25B run-rate revenue and filed its S-1 in mid-2026 at a ~$852B valuation, refocusing on coding (Codex) and enterprise.',
      ja: '2015 年に非営利として設立、2025 年末に営利型 PBC へ再編（非営利が約 26% 保有）。ChatGPT で最広の消費者リーチを持ち、年換算約 250 億ドル、2026 年半ばに約 8520 億ドル評価で S-1 提出。重心をコーディング(Codex)と企業へ。',
    },
    strengths: [
      { zh: '消费者与开发者触达最广', en: 'Largest consumer & developer reach', ja: '消費者・開発者リーチが最大' },
      { zh: '工具执行 / agent 落地强 (Codex)', en: 'Strong tool-use / agentic execution (Codex)', ja: 'ツール実行/agent 実装が強い (Codex)' },
    ],
    watch: [
      { zh: '重组后治理结构复杂', en: 'Governance complexity after restructure', ja: '再編後の統治構造が複雑' },
      { zh: '巨额亏损与算力承诺', en: 'Heavy losses; large compute commitments', ja: '巨額損失と計算資源コミット' },
    ],
    positioning: { zh: '消费级规模 + 企业变现。', en: 'Consumer scale plus enterprise monetization.', ja: '消費者規模＋企業収益化。' },
    productIds: ['codex-cli', 'gpt-55'],
    links: [
      { label: 'openai.com', url: 'https://openai.com' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/OpenAI' },
    ],
    accent: '#10a37f',
  },
  {
    id: 'google-deepmind',
    name: 'Google DeepMind',
    flag: '🇺🇸',
    country: US,
    founded: 2010,
    stance: 'closed',
    valuation: 'Alphabet',
    valuationNote: { zh: 'Alphabet 子公司（上市）', en: 'Alphabet subsidiary (public)', ja: 'Alphabet 子会社（上場）' },
    flagship: 'Gemini 3.1 Pro',
    focus: { zh: '全栈垂直整合', en: 'Full-stack vertical integration', ja: 'フルスタック垂直統合' },
    oneLiner: {
      zh: '唯一拥有完整栈的实验室——模型、TPU、云与分发渠道全自有。',
      en: 'The only lab that owns the whole stack — model, TPU, cloud and distribution.',
      ja: 'スタック全体を自前で持つ唯一のラボ——モデル・TPU・クラウド・流通。',
    },
    analysis: {
      zh: 'Google DeepMind (Demis Hassabis 领衔) 整合了 Alphabet 的 AI。它独有完整垂直整合——前沿 Gemini、自研 TPU (Ironwood)、Google Cloud，加上 Search / Android / Chrome / YouTube / Workspace 的分发——可用 TPU 成本优势压低价格、挤压风投对手利润。Gemini 3.1 Pro 已正式发布，3.5 在预览。也开源轻量 Gemma。',
      en: 'Google DeepMind (Demis Hassabis) consolidates Alphabet\'s AI. It is uniquely vertically integrated — frontier Gemini, in-house TPUs (Ironwood), Google Cloud and distribution via Search/Android/Chrome/YouTube/Workspace — letting it undercut venture-funded rivals on price. Gemini 3.1 Pro is GA, 3.5 in preview; it also open-weights the lighter Gemma.',
      ja: 'Google DeepMind（Demis Hassabis）が Alphabet の AI を統合。前沿 Gemini・自社 TPU(Ironwood)・Google Cloud・Search/Android/Chrome/YouTube/Workspace の流通という独自の垂直統合で、価格競争力により VC 系の競合を圧迫。Gemini 3.1 Pro は GA、3.5 はプレビュー。軽量 Gemma はオープン。',
    },
    strengths: [
      { zh: '全栈：模型 + TPU + 云 + 分发', en: 'Full-stack: model + TPU + cloud + distribution', ja: 'フルスタック：モデル+TPU+クラウド+流通' },
      { zh: '多模态与长上下文领先', en: 'Multimodal & long-context leadership', ja: '多モーダル・長文脈でリード' },
    ],
    watch: [
      { zh: '纯编程实测仍逊 Anthropic / OpenAI', en: 'Pure-coding still trails Anthropic/OpenAI', ja: '純コーディングは Anthropic/OpenAI に劣る' },
      { zh: '大公司出货节奏偏慢', en: 'Big-company shipping cadence', ja: '大企業ゆえの出荷ペース' },
    ],
    positioning: { zh: '以垂直整合为护城河。', en: 'Vertical integration as the moat.', ja: '垂直統合を堀とする。' },
    productIds: ['antigravity', 'gemini-31-pro'],
    links: [
      { label: 'deepmind.google', url: 'https://deepmind.google' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Google_DeepMind' },
    ],
    accent: '#4285f4',
  },
  {
    id: 'xai',
    name: 'xAI',
    flag: '🇺🇸',
    country: US,
    founded: 2023,
    stance: 'closed',
    valuation: '≈$230B',
    valuationNote: { zh: '2026-02 并入 SpaceX', en: 'SpaceX subsidiary (Feb 2026)', ja: 'SpaceX 子会社（2026-02）' },
    flagship: 'Grok 4.3 / Grok 4 Fast',
    focus: { zh: '算力规模 + 实时数据', en: 'Compute scale + real-time data', ja: '計算規模＋リアルタイム' },
    oneLiner: {
      zh: '算力至上的实验室，已并入 SpaceX，押注规模与实时数据。',
      en: 'A compute-maximalist lab, now a SpaceX subsidiary, betting on scale and real-time data.',
      ja: '計算最優先のラボ。SpaceX 傘下となり、規模とリアルタイムに賭ける。',
    },
    analysis: {
      zh: '2023 年由马斯克创立，用 Colossus 超算 (55.5 万张 GPU，向 100 万扩展) 训练 Grok。2026 年 2 月 SpaceX 收购 xAI (合并实体约 1.25 万亿美元)。Grok 4 Fast 以 2M 上下文领先，整体智能略逊前三家，靠 X 实时数据与纯算力而非榜单深度取胜。',
      en: 'Founded in 2023 by Elon Musk, xAI trains Grok on the Colossus supercomputer (555K GPUs, scaling toward 1M). In Feb 2026 SpaceX acquired xAI (combined entity ~$1.25T). Grok 4 Fast leads on context (2M); overall intelligence trails the top three, leaning on real-time X data and raw compute over benchmark depth.',
      ja: '2023 年に Elon Musk が設立、Colossus 超計算機（55.5 万 GPU、100 万へ拡張）で Grok を訓練。2026 年 2 月に SpaceX が xAI を買収（統合体 約 1.25 兆ドル）。Grok 4 Fast は文脈 2M で先行。総合知能は上位 3 社に劣るが、X のリアルタイムデータと計算量で勝負。',
    },
    strengths: [
      { zh: '自有超大算力 (Colossus)', en: 'Massive in-house compute (Colossus)', ja: '自社の巨大計算資源 (Colossus)' },
      { zh: '最大上下文 (2M) + X 实时数据', en: 'Largest context (2M) + real-time X data', ja: '最大文脈(2M)＋X リアルタイム' },
    ],
    watch: [
      { zh: '综合智能仍逊前三家', en: 'Overall intelligence trails the top three', ja: '総合知能は上位 3 社に劣る' },
      { zh: '治理与马斯克 / SpaceX 深度绑定', en: 'Governance tied to Musk / SpaceX', ja: '統治が Musk/SpaceX に依存' },
    ],
    positioning: { zh: '以规模与实时性取代榜单深度。', en: 'Scale and real-time over benchmark depth.', ja: '規模とリアルタイムでベンチ深度を代替。' },
    productIds: ['grok-cli', 'grok-43'],
    links: [
      { label: 'x.ai', url: 'https://x.ai' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/XAI_(company)' },
    ],
    accent: '#9aa0a6',
  },
  {
    id: 'meta',
    name: 'Meta',
    flag: '🇺🇸',
    country: US,
    founded: 2013,
    stance: 'hybrid',
    valuation: 'Meta',
    valuationNote: { zh: 'Meta Platforms（上市）', en: 'Meta Platforms (public)', ja: 'Meta Platforms（上場）' },
    flagship: 'Llama 5 (open) · Muse Spark (closed)',
    focus: { zh: '开源普及 + 闭源前沿', en: 'Open commoditize + closed frontier', ja: 'オープン普及＋クローズド前沿' },
    oneLiner: {
      zh: '从开源旗手转向开 / 闭双轨的「超级智能」豪赌。',
      en: 'Pivoting from open-source champion to a dual open/closed superintelligence bet.',
      ja: 'オープンの旗手から、開/閉の二軸「超知能」へ賭ける。',
    },
    analysis: {
      zh: 'Meta 的 FAIR / 超级智能实验室 (MSL，由 Alexandr Wang 领衔) 在 2026 年首次拆分策略：Llama 5 继续开源，而首个闭源模型 Muse Spark 追求「个人超级智能」。背靠 1150–1350 亿美元资本开支、吉瓦级数据中心 (Prometheus、Hyperion) 与 FB / IG / WhatsApp 的无敌分发。',
      en: 'Meta\'s FAIR / Superintelligence Labs (MSL, led by Alexandr Wang) split strategy in 2026: Llama 5 stays open-weights while Muse Spark — its first closed model — chases "personal superintelligence." Backed by $115–135B capex, gigawatt data centers (Prometheus, Hyperion) and unmatched consumer distribution (FB/IG/WhatsApp).',
      ja: 'Meta の FAIR / 超知能ラボ（MSL、Alexandr Wang 主導）は 2026 年に戦略を分割：Llama 5 はオープン継続、初のクローズド Muse Spark が「個人超知能」を追う。1150–1350 億ドルの設備投資、ギガワット級データセンター(Prometheus, Hyperion)、FB/IG/WhatsApp の比類なき流通が後ろ盾。',
    },
    strengths: [
      { zh: '消费分发无可匹敌', en: 'Unmatched consumer distribution', ja: '消費者流通が比類なし' },
      { zh: '开源 Llama 生态 + 闭源前沿轨', en: 'Open Llama ecosystem + closed frontier track', ja: 'オープン Llama＋クローズド前沿' },
    ],
    watch: [
      { zh: '策略反复 (开源→闭源)', en: 'Strategy whiplash (open → closed)', ja: '戦略の揺れ（開→閉）' },
      { zh: '自身没有编程 / agent 产品', en: 'No coding/agent product of its own', ja: '自前のコーディング/agent 製品なし' },
    ],
    positioning: { zh: '开源普及 + 闭源冲顶。', en: 'Open commoditization plus a closed frontier push.', ja: 'オープン普及＋クローズドで頂点へ。' },
    productIds: [],
    links: [
      { label: 'ai.meta.com', url: 'https://ai.meta.com' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Meta_Superintelligence_Labs' },
    ],
    accent: '#0866ff',
  },
  {
    id: 'alibaba-qwen',
    name: 'Alibaba (Qwen)',
    flag: '🇨🇳',
    country: CN,
    founded: 2023,
    stance: 'hybrid',
    valuation: 'Alibaba',
    valuationNote: { zh: '阿里巴巴（上市）', en: 'Alibaba (public)', ja: 'Alibaba（上場）' },
    flagship: 'Qwen 3.7 Max · Qwen 3.6 (open)',
    focus: { zh: '开源生态 → 云收入', en: 'Open ecosystem → cloud revenue', ja: 'オープン生態系→クラウド収益' },
    oneLiner: {
      zh: '开源权重之王，把「开放」变成了云收入。',
      en: 'The open-weights powerhouse that turned openness into cloud revenue.',
      ja: 'オープンウェイトの雄。「開放」をクラウド収益に変えた。',
    },
    analysis: {
      zh: '阿里 Qwen 是下载量最大的开源权重家族 (约占全球开源模型下载的一半，累计近 10 亿次)，从边缘到前沿全覆盖。2026 年分层：开源 Qwen 3.6 (Apache 2.0) + 闭源 Qwen 3.7 Max (AA 指数 56.6，最强中国模型)。通过阿里云 / DashScope 变现，而非授权费。',
      en: 'Alibaba\'s Qwen is the most-downloaded open-weight family (~50% of global open-model downloads, ~1B cumulative), spanning edge to frontier. In 2026 it split tiers — open Qwen 3.6 (Apache 2.0) plus a closed Qwen 3.7 Max (AA Index 56.6, top Chinese model) — monetizing via Alibaba Cloud / DashScope rather than licensing.',
      ja: 'Alibaba の Qwen は最もダウンロードされるオープンウェイト系（世界のオープンモデル DL の約半分、累計約 10 億）。2026 年に階層を分割：オープン Qwen 3.6(Apache 2.0)＋クローズド Qwen 3.7 Max(AA 指数 56.6、中国最強)。収益は Alibaba Cloud / DashScope から。',
    },
    strengths: [
      { zh: '开源阵容最全，下载近 10 亿', en: 'Broadest open-weight lineup; ~1B downloads', ja: 'オープン陣容が最広、DL 約 10 億' },
      { zh: '开放采用 → 云 / API 收入', en: 'Open adoption → cloud/API revenue', ja: 'オープン採用→クラウド/API 収益' },
    ],
    watch: [
      { zh: '前沿层仍逊美国实验室', en: 'Frontier tier trails US labs', ja: '前沿層は米ラボに劣る' },
      { zh: '开 / 闭分层可能让用户困惑', en: 'Split open/closed may confuse users', ja: '開/閉の分割で混乱の恐れ' },
    ],
    positioning: { zh: '用开源生态喂养云业务。', en: 'An open ecosystem feeding the cloud.', ja: 'オープン生態系でクラウドを育てる。' },
    productIds: ['qwen-code', 'qwen-max'],
    links: [
      { label: 'qwen.ai', url: 'https://qwen.ai' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Qwen' },
    ],
    accent: '#ff6a00',
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    flag: '🇨🇳',
    country: CN,
    founded: 2023,
    stance: 'open',
    valuation: 'Private',
    valuationNote: { zh: '私有（幻方量化背景）', en: 'Private (High-Flyer backed)', ja: '非公開（High-Flyer 系）' },
    flagship: 'DeepSeek V4 (MIT)',
    focus: { zh: '高效开源前沿 · 低成本', en: 'Efficient open frontier · low cost', ja: '高効率オープン前沿 · 低コスト' },
    oneLiner: {
      zh: '效率颠覆者，用 MIT 许可的模型重置了价格曲线。',
      en: 'The efficiency disruptor whose MIT-licensed models reset the price curve.',
      ja: '効率の破壊者。MIT ライセンスのモデルで価格曲線をリセット。',
    },
    analysis: {
      zh: '杭州的 DeepSeek (背靠量化基金幻方) 以 MIT 许可发布接近前沿的模型——V4 (2026-04)，R2 暂未发布。其效率与永久降价 75% 把全球推理价格战推向新高；美国实验室曾指控其蒸馏。',
      en: 'Hangzhou-based DeepSeek (backed by quant fund High-Flyer) ships frontier-adjacent models under MIT — V4 (Apr 2026), with R2 held back. Its efficiency and a permanent 75% price cut escalated the global inference price war; US labs have accused it of distillation.',
      ja: '杭州の DeepSeek（クオンツ系 High-Flyer が後ろ盾）は前沿に迫るモデルを MIT で公開——V4(2026-04)、R2 は保留。効率と恒久 75% 値下げで世界の推論価格戦争を激化。米ラボは蒸留を指摘。',
    },
    strengths: [
      { zh: 'MIT 许可、接近前沿（可自托管 / 隔离）', en: 'Frontier-adjacent under MIT (self-host / air-gap)', ja: 'MIT で前沿級（自己ホスト/隔離可）' },
      { zh: '极致成本效率', en: 'Extreme cost efficiency', ja: '極限のコスト効率' },
    ],
    watch: [
      { zh: '蒸馏争议、出口管制风险', en: 'Distillation allegations; export-control exposure', ja: '蒸留疑惑・輸出規制リスク' },
      { zh: 'R2 推迟、算力基数较小', en: 'R2 delayed; smaller compute base', ja: 'R2 遅延・計算基盤が小さい' },
    ],
    positioning: { zh: '便宜、开放、高效的前沿。', en: 'Cheap, open, efficient frontier.', ja: '安く・開かれ・高効率な前沿。' },
    productIds: [],
    links: [
      { label: 'deepseek.com', url: 'https://www.deepseek.com' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/DeepSeek' },
    ],
    accent: '#4d6bfe',
  },
  {
    id: 'mistral',
    name: 'Mistral AI',
    flag: '🇫🇷',
    country: FR,
    founded: 2023,
    stance: 'open',
    valuation: '≈€20B',
    valuationNote: { zh: '2026-06 融资（ASML 最大股东）', en: 'Raise Jun 2026 (ASML lead holder)', ja: '2026-06 調達（ASML が筆頭）' },
    flagship: 'Mistral Large · open models',
    focus: { zh: '欧洲主权 · 开源', en: 'European sovereign · open', ja: '欧州主権 · オープン' },
    oneLiner: {
      zh: '欧洲主权 AI 旗手，建立在开源权重之上。',
      en: "Europe's sovereign-AI champion, built on open weights.",
      ja: '欧州主権 AI の旗手。オープンウェイトを土台に。',
    },
    analysis: {
      zh: '巴黎的 Mistral (2023 年创立) 是欧洲领头实验室，估值约 200 亿欧元 (ASML 为最大股东)，ARR 约 4 亿美元。开源权重 + 商业模型并行，并自建欧盟算力 (Mistral Compute)，提供不受美国基础设施管辖的产能。',
      en: 'Paris-based Mistral (founded 2023) is Europe\'s leading lab at a ~€20B valuation (ASML its largest shareholder), with ~$400M ARR. It pairs open-weight releases with commercial models and is building its own EU compute (Mistral Compute) to offer capacity not governed by US infrastructure.',
      ja: 'パリの Mistral（2023 年設立）は欧州の主力ラボ、評価 約 200 億ユーロ（ASML が筆頭株主）、ARR 約 4 億ドル。オープンウェイトと商用モデルを併走し、EU 自前計算(Mistral Compute)で米国インフラに依らない容量を提供。',
    },
    strengths: [
      { zh: '欧洲数据主权定位', en: 'European data-sovereignty positioning', ja: '欧州データ主権のポジション' },
      { zh: '开源生态 + 自有算力', en: 'Open-weights ecosystem + own compute', ja: 'オープン生態系＋自前計算' },
    ],
    watch: [
      { zh: '规模仍小于美 / 中前沿', en: 'Smaller scale vs US/China frontier', ja: '規模は米/中前沿より小さい' },
      { zh: '资本密集的基础设施豪赌', en: 'Capital-intensive infrastructure bet', ja: '資本集約なインフラ賭け' },
    ],
    positioning: { zh: '主权、开放的欧洲 AI。', en: 'Sovereign, open, European AI.', ja: '主権的でオープンな欧州 AI。' },
    productIds: [],
    links: [
      { label: 'mistral.ai', url: 'https://mistral.ai' },
      { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Mistral_AI' },
    ],
    accent: '#fa520f',
  },
];

export const companyMap = Object.fromEntries(companies.map((c) => [c.id, c]));

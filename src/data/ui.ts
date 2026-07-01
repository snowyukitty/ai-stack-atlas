import type { Loc } from '../lib/types';

export type LangCode = 'zh' | 'en' | 'ja';

export const LANGS: { code: LangCode; label: string }[] = [
  { code: 'zh', label: '中文' },
  { code: 'en', label: 'EN' },
  { code: 'ja', label: '日本語' },
];

/** UI string table. */
export const ui = {
  siteTitle: {
    zh: 'AI Stack 图鉴',
    en: 'AI Stack Atlas',
    ja: 'AI スタック図鑑',
  },
  siteTagline: {
    zh: '编程智能体 · CLI · Agent Harness · 基础设施 全景导览',
    en: 'A field guide to coding agents, CLIs, agent harnesses & infrastructure',
    ja: 'コーディングエージェント・CLI・Agent Harness・基盤の全景ガイド',
  },
  nav: {
    home: { zh: '首页', en: 'Home', ja: 'ホーム' },
    catalog: { zh: '产品图鉴', en: 'Catalog', ja: 'カタログ' },
    compare: { zh: '对比', en: 'Compare', ja: '比較' },
    companies: { zh: '公司', en: 'Companies', ja: '企業' },
    concepts: { zh: '概念解析', en: 'Concepts', ja: '概念' },
    rankings: { zh: '排名 / 评测', en: 'Rankings', ja: 'ランキング' },
    stack: { zh: '我的 Stack', en: 'My Stack', ja: 'My Stack' },
  },
  hero: {
    title: {
      zh: '看懂整个 AI Stack',
      en: 'Make sense of the entire AI stack',
      ja: 'AI スタックの全体像をつかむ',
    },
    sub: {
      zh: '从「模型」到「harness」到「基础设施」——把编程智能体、CLI、Agent 框架与平台讲清楚，帮你入门、对比、深入。',
      en: 'From models to harnesses to infrastructure — a clear, opinionated map of coding agents, CLIs, agent frameworks and platforms to help you start, compare and go deep.',
      ja: 'モデルから harness、そして基盤まで — コーディングエージェント・CLI・Agent フレームワーク・プラットフォームを整理し、入門・比較・深掘りを支援します。',
    },
    ctaCatalog: { zh: '浏览产品图鉴', en: 'Browse the catalog', ja: 'カタログを見る' },
    ctaConcepts: { zh: '先搞懂概念', en: 'Learn the concepts', ja: '概念から学ぶ' },
  },
  labels: {
    featured: { zh: '精选', en: 'Featured', ja: '注目' },
    mine: { zh: '自研项目', en: 'My project', ja: '自作' },
    command: { zh: '命令', en: 'Command', ja: 'コマンド' },
    models: { zh: '背后模型', en: 'Backing models', ja: 'モデル' },
    pricing: { zh: '价格', en: 'Pricing', ja: '価格' },
    license: { zh: '许可', en: 'License', ja: 'ライセンス' },
    pros: { zh: '优点', en: 'Strengths', ja: '強み' },
    cons: { zh: '取舍', en: 'Trade-offs', ja: '弱み' },
    bestFor: { zh: '适合', en: 'Best for', ja: '向いている人' },
    links: { zh: '链接', en: 'Links', ja: 'リンク' },
    myRating: { zh: '我的评分', en: 'My rating', ja: '評価' },
    benchmark: { zh: '基准', en: 'Benchmark', ja: 'ベンチマーク' },
    all: { zh: '全部', en: 'All', ja: 'すべて' },
    search: { zh: '搜索产品 / 厂商 / 标签…', en: 'Search products, vendors, tags…', ja: '製品・ベンダー・タグを検索…' },
    noResults: { zh: '没有匹配的产品。', en: 'No matching products.', ja: '一致する製品がありません。' },
    showing: { zh: '显示', en: 'Showing', ja: '表示' },
    results: { zh: '个产品', en: 'products', ja: '件' },
    result: { zh: '个产品', en: 'product', ja: '件' },
    openSource: { zh: '开源', en: 'Open source', ja: 'オープンソース' },
    partialOpen: { zh: '部分开源', en: 'Source-available', ja: '一部公開' },
    closed: { zh: '闭源', en: 'Proprietary', ja: 'プロプライエタリ' },
    sunset: { zh: '已停服 / 迁移中', en: 'Sunsetting', ja: '終了予定' },
    beta: { zh: 'Beta', en: 'Beta', ja: 'Beta' },
    seeAlso: { zh: '延伸', en: 'See also', ja: '関連' },
    backToCatalog: { zh: '← 返回图鉴', en: '← Back to catalog', ja: '← カタログへ' },
    lastUpdated: { zh: '数据更新', en: 'Data updated', ja: 'データ更新' },
    theme: { zh: '主题', en: 'Theme', ja: 'テーマ' },
  },
  footer: {
    built: {
      zh: '一个会持续更新的 AI Stack 知识库 · 数据驱动 · 四语（EN / 日 / 繁 / 简）',
      en: 'A continuously updated AI-stack knowledge base · data-driven · 4 languages (EN / 日 / 繁 / 简)',
      ja: '継続更新する AI スタック知識ベース · データ駆動 · 4 言語（EN / 日 / 繁 / 简）',
    },
    disclaimer: {
      zh: '评分与定位为个人观点，benchmark 数据引自公开来源，会随版本变化。',
      en: 'Ratings and takes are personal; benchmark figures cite public sources and shift with each release.',
      ja: '評価は個人的見解、ベンチマークは公開情報の引用で、リリースごとに変動します。',
    },
  },
} satisfies Record<string, Record<string, Loc> | Loc>;

/** Resolve a Loc-or-nested object trivially; kept for symmetry. */
export function pick(loc: Loc, lang: LangCode): string {
  return loc[lang];
}

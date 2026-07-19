/**
 * A localized string triple used for authoring.
 * Display order: English (primary) · Japanese (secondary) · Traditional Chinese.
 * `zh` holds Simplified Chinese (kept in data + HTML). Traditional Chinese is
 * derived at build time via OpenCC for the 繁 locale. The Simplified switcher
 * option is temporarily hidden in the UI.
 */
export interface Loc {
  zh: string;
  en: string;
  ja: string;
}

export type CategoryId =
  | 'coding-cli'
  | 'coding-ide'
  | 'app-builder'
  | 'framework'
  | 'infra'
  | 'model'
  | 'music-gen'
  | 'video-gen'
  | 'image-gen'
  | 'voice-clone'
  | '3d-gen'
  | 'avatar-gen';

export type LicenseKind = 'open' | 'partial' | 'closed';
export type Status = 'active' | 'beta' | 'sunset';

export interface BenchScore {
  /** e.g. "Terminal-Bench 2.1" */
  label: string;
  /** e.g. "78.9%" */
  value: string;
}

export interface LinkRef {
  label: string;
  url: string;
}

export interface Product {
  id: string;
  name: string;
  /** Company / maintainer. */
  vendor: string;
  category: CategoryId;
  /** Short kind label, e.g. "CLI coding agent". */
  subtype: Loc;
  /** Shell command, if it is a CLI. */
  command?: string;
  tagline: Loc;
  description: Loc;
  /** Backing models or model providers. */
  models: string[];
  pricing: Loc;
  license: LicenseKind;
  status: Status;
  /** Personal 0-5 rating (the site owner's). Optional. */
  rating?: number;
  benchmarks?: BenchScore[];
  pros: Loc[];
  cons: Loc[];
  /** Who it is for. */
  bestFor?: Loc;
  links: LinkRef[];
  tags: string[];
  featured?: boolean;
  /** The owner's own project. */
  mine?: boolean;
}

export interface Category {
  id: CategoryId;
  name: Loc;
  short: Loc;
  blurb: Loc;
  icon: string;
}

export interface Concept {
  id: string;
  term: Loc;
  /** One-line analogy / hook. */
  hook: Loc;
  body: Loc;
  /** Related concept ids. */
  see?: string[];
}

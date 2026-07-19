// Build-time Simplified -> Traditional Chinese conversion.
//
// Authoring stays trilingual (zh / en / ja). User-facing Chinese is Traditional
// ("繁" / hant), derived from the Simplified `zh` strings via OpenCC so we don't
// duplicate hundreds of entries. Simplified translations are still rendered into
// the HTML (and kept in data), but the language-switcher button is temporarily
// hidden — re-enable by unhiding the 简 button in Header.astro.
// `twp` = Simplified -> Traditional (Taiwan standard, with phrase/vocabulary
// localization, e.g. 软件->軟體, 网络->網路, 鼠标->滑鼠). OpenCC only touches CJK
// characters, so any inline HTML/ASCII in a string passes through untouched.
import { Converter } from 'opencc-js';

const convert = Converter({ from: 'cn', to: 'twp' });

export function toHant(s: string): string {
  return convert(s);
}

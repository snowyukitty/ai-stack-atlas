// Build-time Simplified -> Traditional Chinese conversion.
//
// The dataset stays trilingual (zh / en / ja). Traditional Chinese ("繁") is a
// FOURTH *display* locale derived from the Simplified `zh` text at build time via
// OpenCC, so we render it into the HTML without duplicating hundreds of strings.
// `twp` = Simplified -> Traditional (Taiwan standard, with phrase/vocabulary
// localization, e.g. 软件->軟體, 网络->網路, 鼠标->滑鼠). OpenCC only touches CJK
// characters, so any inline HTML/ASCII in a string passes through untouched.
import { Converter } from 'opencc-js';

const convert = Converter({ from: 'cn', to: 'twp' });

export function toHant(s: string): string {
  return convert(s);
}

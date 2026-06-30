// Minimal type shim for opencc-js (ships no types). We only use the high-level
// Converter preset API: Converter({ from, to }) -> (text) => text.
declare module 'opencc-js' {
  type Locale = 'cn' | 'tw' | 'twp' | 't' | 'hk' | 'jp';
  export function Converter(options: { from: Locale; to: Locale }): (text: string) => string;
}

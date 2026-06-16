// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build
// Pure static output. Deployed as a GitHub Pages project site under a sub-path.
// The build inlines all CSS/JS and embeds the favicon as a data URI, so dist/
// emits a single self-contained index.html with no external asset URLs — which
// means `base` has no effect on the offline (file://) double-click experience.
export default defineConfig({
  site: 'https://snowyukitty.github.io',
  base: '/ai-stack-atlas/',
  output: 'static',
  trailingSlash: 'ignore',
  // Single self-contained file: always inline CSS so dist/index.html works
  // straight from file:// (double-click), with no server and no external assets.
  build: {
    inlineStylesheets: 'always',
    assets: '_astro',
  },
});

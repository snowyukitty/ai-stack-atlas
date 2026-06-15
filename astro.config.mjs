// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build
// Pure static output. To deploy under a sub-path (e.g. GitHub Pages project
// site) set `site` and `base` below, then rebuild.
export default defineConfig({
  // site: 'https://your-domain.example',
  output: 'static',
  trailingSlash: 'ignore',
  // Single self-contained file: always inline CSS so dist/index.html works
  // straight from file:// (double-click), with no server and no external assets.
  build: {
    inlineStylesheets: 'always',
    assets: '_astro',
  },
});

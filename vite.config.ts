import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {fileURLToPath} from 'node:url';
import {defineConfig, loadEnv, type Plugin} from 'vite';

/**
 * Injects the absolute site metadata (canonical + social preview URLs) from
 * `VITE_SITE_URL` at build time.
 *
 * Nothing is injected when the variable is not configured, so the build never
 * publishes a broken or misleading absolute URL (the previous canonical tag
 * pointed at a GitHub profile).
 */
function siteMetadataPlugin(siteUrl: string): Plugin {
  const normalized = siteUrl.trim().replace(/\/+$/, '');

  return {
    name: 'portfolio-site-metadata',
    transformIndexHtml(html: string) {
      if (!normalized) return html;

      const tags = [
        `<link rel="canonical" href="${normalized}/" />`,
        `<meta property="og:url" content="${normalized}/" />`,
        `<meta property="og:image" content="${normalized}/og-image.jpg" />`,
        `<meta name="twitter:image" content="${normalized}/og-image.jpg" />`,
      ].join('\n    ');

      return html.replace('</head>', `  ${tags}\n  </head>`);
    },
  };
}

/**
 * Preloads the hero portrait.
 *
 * The portrait is the largest above-the-fold image and is painted inside the
 * React tree, so without an explicit hint the browser cannot discover it until
 * it has finished downloading and parsing the JS bundle. Declaring it in the
 * document head moves that request onto the critical path in parallel with the
 * stylesheet and the scripts, which is where the real first-paint win comes from.
 *
 * The href is built from the base Vite actually resolved (CLI flag, env var or
 * default), so it stays correct when the site is deployed under a sub-path.
 */
function preloadPortraitPlugin(): Plugin {
  // Vite resolves `base` from the CLI flag / env var / default, and only exposes
  // it once the config is resolved — hence the mutable holder read at transform
  // time rather than at plugin-construction time.
  const resolvedBase = { value: '/' };

  return {
    name: 'portfolio-preload-portrait',
    configResolved(config) {
      resolvedBase.value = config.base;
    },
    transformIndexHtml(html: string) {
      const base = resolvedBase.value.endsWith('/')
        ? resolvedBase.value
        : `${resolvedBase.value}/`;

      return html.replace(
        '<link rel="icon"',
        `<link rel="preload" as="image" href="${base}images/portrait.jpg" fetchpriority="high" />\n    <link rel="icon"`,
      );
    },
  };
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    plugins: [
      react(),
      tailwindcss(),
      siteMetadataPlugin(env.VITE_SITE_URL ?? ''),
      preloadPortraitPlugin(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(fileURLToPath(new URL('./src', import.meta.url))),
      },
    },

    /**
     * Pre-bundling the runtime + icon library explicitly skips the bundler's
     * dependency discovery crawl on the very first `vite` start, so the dev
     * server serves already-transformed modules immediately.
     */
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime', 'lucide-react'],
    },

    build: {
      /**
       * The stylesheet already relies on modern CSS (`overflow-wrap`,
       * `text-wrap: balance`, `:focus-visible`, `color-scheme`), so the output
       * is only down-levelled to the same ES2022 baseline the TypeScript
       * config targets. This removes a large amount of needless transpilation
       * helper code from the bundle.
       */
      target: 'es2022',
      cssCodeSplit: true,
      sourcemap: false,
      /**
       * Gzip sizes are only used for the build report and cost an extra
       * compression pass over every emitted chunk. Nothing in the app reads
       * them, so they are not worth the build time.
       */
      reportCompressedSize: false,
      /**
       * The app already ships no legacy build target, so the modulepreload
       * ponyfill is dead weight on every page load.
       */
      modulePreload: { polyfill: false },
      rollupOptions: {
        output: {
          /**
           * React has its own, very stable, cache lifetime. Splitting it into
           * a single long-lived chunk lets the browser reuse it across app
           * deploys and, more importantly on a cold load, parse the runtime in
           * parallel with the application code instead of in one long
           * serialised bundle.
           */
          manualChunks(id) {
            if (id.includes('node_modules')) {
              // Only React is split out. It is by far the largest dependency,
              // has an extremely stable cache lifetime, and separating it lets
              // the browser fetch and parse the runtime in parallel with the
              // application code instead of in one long serialised bundle.
              //
              // Everything else (including `lucide-react`) is deliberately left
              // in the main chunk: splitting it too would only add extra
              // requests, since the lazily loaded modals share those icons with
              // the eagerly loaded sections anyway.
              if (/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) {
                return 'react-vendor';
              }
            }
            return undefined;
          },
        },
      },
    },

    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

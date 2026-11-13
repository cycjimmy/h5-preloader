import { createRequire } from 'node:module'

import myBanner from '@cycjimmy/config-lib/esm/chore/myBanner.js'
import terserOption from '@cycjimmy/config-lib/esm/terser/4.x/production.js'
import { defineConfig } from 'vite'

const pkg = createRequire(import.meta.url)('./package.json')

// config-lib's shared option follows terser 4's legacy `output` key. Vite 8
// always injects `format` and terser rejects having both, so convert
// `output` → `format`.
const { output, ...restTerserOption } = terserOption
const terserOptions = { ...restTerserOption, format: output }

// Output file names follow the pkg field conventions of the old rollup configs.
const esmFileName = pkg.module.replace('dist/', '') // h5-preloader.esm.js
const umdFileName = pkg.browser.replace('dist/', '').replace('.min.js', '.js') // h5-preloader.umd.js
const umdMinFileName = pkg.browser.replace('dist/', '') // h5-preloader.umd.min.js

function libBuild({ formats, fileName, minify = false, banner = null }) {
  return {
    target: 'es2015',
    outDir: 'dist',
    // Keep artifacts of previous incremental builds (`npm run build` cleans dist first).
    emptyOutDir: false,
    minify,
    ...(minify === 'terser' && { terserOptions }),
    lib: {
      entry: 'src/index.js',
      name: 'h5Preloader',
      formats,
      fileName: () => fileName,
    },
    rollupOptions: {
      output: {
        exports: 'default',
        ...(banner && { banner }),
      },
    },
  }
}

const builds = {
  'esm': libBuild({
    formats: ['es'],
    fileName: esmFileName,
  }),
  'umd': libBuild({
    formats: ['umd'],
    fileName: umdFileName,
  }),
  'umd-min': libBuild({
    formats: ['umd'],
    fileName: umdMinFileName,
    minify: 'terser',
    banner: myBanner(pkg),
  }),
  'deployment': libBuild({
    formats: ['umd'],
    fileName: umdFileName,
  }),
}

export default defineConfig(({ mode }) => {
  const build = builds[mode]

  return {
    // Avoid copying static/ (or any public dir) into dist and polluting .release.
    publicDir: false,
    ...(build && { build }),
  }
})

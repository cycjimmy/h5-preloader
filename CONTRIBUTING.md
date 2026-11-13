# Contributing

The repository is released under the MIT license, and follows a standard GitHub development process, using GitHub tracker for issues and merging pull requests into `main`.

## Requirements

* Node.js 22.22+ or 24.x (CI runs the test matrix on 22 and 24)
* npm 10+

## Development

```shell
$ npm install
$ npm run dev
```

`npm run dev` starts the Vite dev server with the demo page in the repository
root. It imports `src/index.js` directly, so no build step is needed while
iterating.

## Checks

```shell
$ npm run lint          # ESLint (@antfu/eslint-config) over the whole repository
$ npm run lint:fix
$ npm run lint:style    # stylelint over the CSS files
$ npm run lint:style:fix
$ npm test              # Jest (jsdom)
$ npm run test:coverage # Jest with coverage, uploaded by the Coveralls workflow
$ npm run package       # full build into .release/, the directory published to npm
```

## Build outputs

`npm run build` writes three files into `dist/`:

| File | Format | Purpose |
| --- | --- | --- |
| `h5-preloader.esm.js` | ESM | `main`, `module` and `exports` entry (bundlers, `import`) |
| `h5-preloader.umd.js` | UMD | unminified browser build, used by the GitHub Pages demo |
| `h5-preloader.umd.min.js` | UMD | minified browser/CDN build, attached to the GitHub release |

`npm run build:deployment` builds the UMD bundle and copies `static/` plus the
bundle into `.publish/`, which the `Deploy To GitHub Pages` workflow uploads as
a Pages artifact and publishes with `actions/deploy-pages`.

The package is ESM only: there is no CommonJS bundle. Node.js 20.19+ / 22.12+
can `require()` the ESM entry, but the library touches `window` while the module
is evaluated, so a DOM (`jsdom`) is still required outside a browser.

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/) in English:

* `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, `chore:`
* A breaking change **must** carry a `BREAKING CHANGE:` footer, which
  produces the next major release. The `feat!:` / `fix!:` shorthand is not
  enough on its own: the commit analyzer runs on the angular preset, whose
  header pattern does not recognise the `!` marker.

Releases are automated: pushing to `main` runs `semantic-release`, which bumps
the version, updates `docs/CHANGELOG.md` and publishes the package.

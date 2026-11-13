export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-idiomatic-order',
  ],
  rules: {
    // The demo page keeps the `-webkit-` prefixes on purpose: `user-select` and
    // `text-size-adjust` are still prefixed on older mobile Safari, and the
    // rule's autofix would silently drop them.
    'property-no-vendor-prefix': null,
  },
  ignoreFiles: [
    'dist/**',
    '.release/**',
    '.publish/**',
    'coverage/**',
    'node_modules/**',
  ],
}

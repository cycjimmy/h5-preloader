export default {
  testEnvironment: 'jsdom',
  // `npm run package` writes a copy of this package into `.release`. Without
  // these ignores Jest reports a haste module naming collision for the
  // duplicated package.json and walks generated files it should not touch.
  modulePathIgnorePatterns: [
    '<rootDir>/.release/',
    '<rootDir>/.publish/',
    '<rootDir>/dist/',
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
}

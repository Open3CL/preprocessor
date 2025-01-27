import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    reporters: ['junit', 'default'],
    outputFile: {
      junit: './junit-report.xml'
    },
    passWithNoTests: true,
    coverage: {
      exclude: [
        ...configDefaults.coverage.exclude,
        'src/index.js',
        'index.js',
        'scripts/*.js',
        '*.config.cjs',
        'duplicate/**/*.js'
      ],
      reporter: ['text', 'html'],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100
      }
    }
  }
});

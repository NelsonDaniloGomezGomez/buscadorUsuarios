export default {
  preset: 'ts-jest/presets/default-esm',  // Preset para ES Modules con TS
  testEnvironment: 'jsdom',
  extensionsToTreatAsEsm: ['.ts', '.mts'],
  transform: {
    '^.+\\.(ts|tsx|mts)$': ['ts-jest', { useESM: true }],
  },
  moduleNameMapper: {
    // Para evitar errores con imports que tienen extensión .js en código TS
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
};

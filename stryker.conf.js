module.exports = {
  mutator: 'javascript',
  packageManager: 'yarn',
  reporters: ['html', 'clear-text', 'progress'],
  testRunner: 'jest',
  transpilers: [],
  coverageAnalysis: 'off',
  mutate: [
    'src/**/*.js?(x)',
    '!src/**/__tests__/*.js?(x)',
    '!src/**/__mocks__/*.js?(x)',
    '!src/reference/gameInfo.js',
  ],
};

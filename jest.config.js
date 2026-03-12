module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
    '^next/image$': '<rootDir>/__mocks__/nextImageMock.tsx',
    '^next/navigation$': '<rootDir>/__mocks__/nextNavigationMock.ts',
  },

  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: './tsconfig.json' }],
  },

  testMatch: ['**/*.test.(ts|tsx)'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  collectCoverage: true,
  collectCoverageFrom: [
    'src/components/**/*.{ts,tsx}',
    'src/store/**/*.{ts,tsx}',
    'src/utils/**/*.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
  ],
  coverageReporters: ['text', 'lcov'],
};

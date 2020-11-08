// jest.config.ts
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: false,
  // ignoring client folder
  modulePathIgnorePatterns: ['<rootDir>/src/client'],
};
export default config;

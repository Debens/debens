const path = require('path');
const merge = require('deepmerge');

const preset = require('react-native/jest-preset');

module.exports = merge(
    preset,
    {
        cacheDirectory: '<rootDir>/test/cache',
        coverageDirectory: '<rootDir>/test/coverage',
        coveragePathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/test'],
        coverageReporters: ['lcov', 'json', 'text'],
        coverageThreshold: {
            global: {
                branches: 85,
                functions: 85,
                lines: 85,
                statements: 85,
            },
        },
        globals: {
            window: {},
            'ts-jest': {
                tsconfig: '<rootDir>/tsconfig.json',
            },
        },
        moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
        reporters: ['default'],
        setupFilesAfterEnv: [
            '@testing-library/react-native/dont-cleanup-after-each',
            '@testing-library/jest-native/extend-expect',
            path.resolve(__dirname, './test/setup/scheduler.ts'),
            path.resolve(__dirname, './test/setup/cleanup.ts'),
            path.resolve(__dirname, './test/setup/reanimated.ts'),
        ],
        // snapshotSerializers: ['<rootDir>/test/serializer.ts'],
        transformIgnorePatterns: [
            'node_modules/(?!((jest-)?react-native(-.*)?|@react-native(-community)?)/)',
        ],
        verbose: true,
    },
    {
        customMerge(key) {
            if (key === 'transformIgnorePatterns') {
                return (_, incoming) => incoming;
            }
        },
    },
);

const path = require('path');
const merge = require('deepmerge');

const preset = require('react-native/jest-preset');

module.exports = merge(
    preset,
    {
        cacheDirectory: '<rootDir>/.jest/cache',
        coverageDirectory: '<rootDir>/.jest/coverage',
        coveragePathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/.jest'],
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
        moduleNameMapper: {
            '^.+\\.(bmp|gif|jpg|jpeg|mp4|png|psd|webp|eot|otf|ttf|woff|woff2|webm|wav|mp3|m4a|aac|oga)$':
                path.resolve(__dirname, './src/transformers/asset-transformer.js'),
            '^.+\\.(css|less)$': path.resolve(__dirname, './src/transformers/asset-transformer.js'),
        },
        modulePathIgnorePatterns: ['<rootDir>/build'],
        reporters: ['default'],
        setupFilesAfterEnv: [
            'cross-fetch/polyfill',
            '@testing-library/react-native/dont-cleanup-after-each',
            '@testing-library/jest-native/extend-expect',
            path.resolve(__dirname, './test/setup/scheduler.ts'),
            path.resolve(__dirname, './test/setup/cleanup.ts'),
            path.resolve(__dirname, './test/setup/reanimated.ts'),
        ],
        // snapshotSerializers: ['<rootDir>/.jest/serializer.ts'],
        testPathIgnorePatterns: ['build/', '.jest/', '\\.snap$'],
        transform: {
            '\\.[jt]sx?$': 'babel-jest',
            '^.+\\.svg': path.resolve(__dirname, './src/transformers/react-transformer.js'),
        },
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

module.exports = {
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
    modulePathIgnorePatterns: ['<rootDir>/build'],
    reporters: ['default'],
    transform: {
        '\\.[jt]sx?$': 'babel-jest',
    },
    transformIgnorePatterns: ['node_modules/(?!variables/.*)'],
    setupFilesAfterEnv: ['cross-fetch/polyfill'],
    verbose: true,
};

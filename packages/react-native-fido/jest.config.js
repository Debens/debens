module.exports = {
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
    transform: {
        '\\.[jt]sx?$': 'babel-jest',
    },
    transformIgnorePatterns: ['node_modules/(?!variables/.*)'],
    verbose: true,
};

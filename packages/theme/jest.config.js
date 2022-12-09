const package = require('./package');

module.exports = {
    cacheDirectory: '<rootDir>/.jest/cache',
    coverageDirectory: '<rootDir>/.jest/coverage',
    coveragePathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/.jest'],
    // setupFiles: ['<rootDir>/jest/globals.ts'],
    coverageReporters: ['lcov', 'json', 'text'],
    coverageThreshold: {
        global: {
            branches: 85,
            functions: 85,
            lines: 85,
            statements: 85,
        },
    },
    displayName: package.name,
    globals: {
        window: {},
    },
    moduleFileExtensions: ['js', 'ts'],
    name: package.name,
    reporters: ['default'],
    // snapshotSerializers: ['<rootDir>/.jest/serializer.ts'],
    testPathIgnorePatterns: ['\\.snap$', 'node_modules/', '.jest/'],
    transform: {
        '\\.[jt]sx?$': 'babel-jest',
    },
    verbose: true,
};

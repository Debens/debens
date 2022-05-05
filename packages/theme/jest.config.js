const package = require('./package');

module.exports = {
    cacheDirectory: '<rootDir>/test/cache',
    coverageDirectory: '<rootDir>/test/coverage',
    coveragePathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/test'],
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
    // snapshotSerializers: ['<rootDir>/test/serializer.ts'],
    testPathIgnorePatterns: ['\\.snap$', 'node_modules/', 'test/'],
    transform: {
        '\\.[jt]sx?$': 'babel-jest',
    },
    verbose: true,
};

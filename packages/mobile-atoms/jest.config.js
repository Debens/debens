const package = require('./package');

module.exports = {
    displayName: package.name,
    preset: '@training/mobile-testing',
    testPathIgnorePatterns: ['test/', '\\.snap$'],
    transform: {
        '\\.[jt]sx?$': 'babel-jest',
    },
};

const package = require('./package');

module.exports = {
    displayName: package.name,
    preset: '@training/mobile-testing',
    testPathIgnorePatterns: ['build/', 'test/', '\\.snap$'],
};

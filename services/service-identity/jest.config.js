const package = require('./package');

module.exports = {
    displayName: package.name,
    preset: '@debens/mobile-testing',
    testPathIgnorePatterns: ['build/', 'test/', '\\.snap$'],
};

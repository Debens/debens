/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');

const ROOT = path.resolve(__dirname, '../../');

module.exports = {
    watchFolders: [ROOT],
    transformer: {
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: true,
            },
        }),
    },
    resolver: {
        sourceExts: ['jsx', 'js', 'ts', 'tsx'], //add here
    },
};

/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');

const ROOT = path.resolve(__dirname, '../../');

const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
    const { resolver } = await getDefaultConfig();
    const { sourceExts, assetExts } = resolver;

    return {
        watchFolders: [ROOT],
        transformer: {
            babelTransformerPath: require.resolve('react-native-svg-transformer'),
            getTransformOptions: async () => ({
                transform: {
                    experimentalImportSupport: false,
                    inlineRequires: true,
                },
            }),
        },
        resolver: {
            assetExts: assetExts.filter(ext => ext !== 'svg'),
            sourceExts: [...sourceExts, 'svg'],
        },
    };
})();

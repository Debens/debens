const typescriptTransformer = require('react-native-typescript-transformer');
const svgTransformer = require('react-native-svg-transformer');

const defaultTransformerKey = Symbol.for('default_transformer_key');
const transformers = {
    ['.svg']: svgTransformer,
    [defaultTransformerKey]: typescriptTransformer,
};

module.exports.transform = ({ src, filename, options }) => {
    const extension = Object.keys(transformers).find(ext => filename.endsWith(ext)) || defaultTransformerKey;

    return transformers[extension].transform({ src, filename, options });
};

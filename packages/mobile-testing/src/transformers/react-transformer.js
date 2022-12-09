const path = require('path');
const { pascalCase } = require('change-case');

module.exports = {
    process(src, filename, config, options) {
        const basename = path.basename(filename);
        const name = pascalCase(basename.split('.')[0]);

        return `const React = require('react');

        module.exports = class ${name} extends React.Component {
            render() {
                return React.createElement("${basename}", this.props, null);
            }
        }`;
    },
};

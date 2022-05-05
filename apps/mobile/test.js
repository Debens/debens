const { resolvePath } = require('babel-plugin-module-resolver');
const path = require('path');

const MONOREPO_ROOT = path.resolve(__dirname, '../..');
// `opts` are the options as passed to the Babel config (should have keys like "root", "alias", etc.)
const realPath = resolvePath('@training/mobile-atoms', __filename, {
    root: MONOREPO_ROOT,
    extensions: ['.ts'],
    alias: {
        '^@training/(.+)': ([_, name]) =>
            [`apps/${name}/src`, `packages/${name}/src`].map(route => path.resolve(MONOREPO_ROOT, route)),
    },
});

console.error(realPath);

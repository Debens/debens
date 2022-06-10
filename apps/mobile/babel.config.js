const path = require('path');
const { readdirSync } = require('fs');

const MONOREPO_ROOT = path.resolve(__dirname, '../..');

const getPackages = name =>
    readdirSync(path.resolve(MONOREPO_ROOT, name), { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

const PACKAGE_LOCATIONS = ['apps', 'modules', 'packages', 'services']
    .map(name =>
        getPackages(name).reduce((packages, package) => {
            return Object.assign(packages, { [package]: name });
        }, {}),
    )
    .reduce((left, right) => Object.assign(left, right));

const getRoute = package => path.resolve(MONOREPO_ROOT, PACKAGE_LOCATIONS[package], package, 'src');
const getRelative = package =>
    Object.keys(PACKAGE_LOCATIONS).includes(package)
        ? path.relative(__dirname, getRoute(package))
        : undefined;

module.exports = {
    comments: true,
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        [
            'module-resolver',
            {
                root: MONOREPO_ROOT,
                alias: {
                    '^@training/(.+)': ([_, name]) => getRelative(name),
                    // '^@training/(.+)': '../../packages/\\1/src',
                },
            },
        ],
        'react-native-reanimated/plugin',
    ],
};

import 'react-native-get-random-values';

import { AppRegistry } from 'react-native';

import seedrandom from 'seedrandom';

import { name as appName } from './app.json';
import App from './src/App';

// node_modules/shuffle-seed/shuffle-seed.js
declare global {
    export interface Math {
        seedrandom: typeof seedrandom;
    }
}

Object.assign(Math, { seedrandom });

AppRegistry.registerComponent(appName, () => App);

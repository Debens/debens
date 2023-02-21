import 'react-native-get-random-values';

import { AppRegistry, Platform } from 'react-native';

import { Federated, Script, ScriptManager } from '@callstack/repack/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { App } from './src/App';

const resolveURL = Federated.createURLResolver({
    containers: {
        main: 'https://api.debens.app/static/android/[name][ext]',
        AngryMogisan: 'https://api.debens.app/static/android/[name][ext]',
    },
    chunks: {
        main: 'https://api.debens.app/static/android/[name][ext]',
    },
});

ScriptManager.shared.setStorage(AsyncStorage);
ScriptManager.shared.addResolver(async (scriptId, caller) => {
    // In development, get all the chunks from dev server.
    if (__DEV__) {
        return {
            url: Script.getDevServerURL(scriptId),
            cache: false,
            query: {
                platform: Platform.OS,
            },
        };
    }

    // In production, get chunks matching the regex from filesystem.
    if (/^.+\.local$/.test(scriptId)) {
        return {
            url: Script.getFileSystemURL(scriptId),
        };
    } else {
        const url = resolveURL(scriptId, caller);
        if (!url) {
            return undefined;
        }

        return {
            url,
            query: {
                platform: Platform.OS,
            },
        };
    }
});

AppRegistry.registerComponent('mobile', () => App);

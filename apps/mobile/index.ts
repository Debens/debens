import 'react-native-get-random-values';

import { AppRegistry, Platform } from 'react-native';

import { Federated, Script, ScriptManager } from '@callstack/repack/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { App } from './src/App';

const resolveURL = Federated.createURLResolver({
    containers: {
        AngryMogisan: 'http://localhost:8082/[name][ext]',
    },
});

ScriptManager.shared.setStorage(AsyncStorage);
ScriptManager.shared.addResolver(async (scriptId, caller) => {
    const url = caller === 'main' ? Script.getDevServerURL(scriptId) : resolveURL(scriptId, caller);
    if (!url) {
        return undefined;
    }

    return {
        url,
        cache: false, // For development
        query: {
            platform: Platform.OS,
        },
    };
});

ScriptManager.shared.addResolver(async scriptId => {
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
        return {
            url: Script.getRemoteURL(`https://api.debens.app/chunks/${scriptId}`),
            query: {
                platform: Platform.OS,
            },
        };
    }
});

AppRegistry.registerComponent('mobile', () => App);

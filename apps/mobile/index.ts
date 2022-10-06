import { AppRegistry } from 'react-native';

import { Script, ScriptManager } from '@callstack/repack/client';

import { App } from './src/App';

ScriptManager.shared.addResolver(async scriptId => {
    // In development, get all the chunks from dev server.
    if (__DEV__) {
        return {
            url: Script.getDevServerURL(scriptId),
            cache: false,
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
        };
    }
});

AppRegistry.registerComponent('mobile', () => App);

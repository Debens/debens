import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableFreeze, enableScreens } from 'react-native-screens';

import { GhostProvider } from '@training/mobile-atoms';
import { ThemeProvider, themes } from '@training/theme';

import MainNavigator from './navigation/MainNavigator';

enableScreens();
enableFreeze();

export const App = () => (
    <GhostProvider>
        <ThemeProvider theme={themes.light}>
            <SafeAreaProvider>
                <MainNavigator />
            </SafeAreaProvider>
        </ThemeProvider>
    </GhostProvider>
);

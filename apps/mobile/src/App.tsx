import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableFreeze, enableScreens } from 'react-native-screens';

import { NavigationContainer } from '@react-navigation/native';
import { GhostProvider } from '@training/mobile-atoms';
import { ThemeProvider, themes } from '@training/theme';

import AppNavigator from './navigation/AppNavigator';

enableScreens();
enableFreeze();

export const App = () => (
    <GhostProvider>
        <ThemeProvider theme={themes.light}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <AppNavigator />
                </NavigationContainer>
            </SafeAreaProvider>
        </ThemeProvider>
    </GhostProvider>
);

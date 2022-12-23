import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableFreeze, enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';

import { GhostProvider } from '@debens/mobile-atoms';
import { NavigationProvider } from '@debens/mobile-navigation';
import { ThemeProvider, themes } from '@debens/theme';

import AppNavigator from './navigation/AppNavigator';
import store from './redux/store';

enableScreens();
enableFreeze();

export const App = () => (
    <Provider store={store}>
        <GhostProvider>
            <ThemeProvider theme={themes.light}>
                <SafeAreaProvider>
                    <NavigationProvider>
                        <AppNavigator />
                    </NavigationProvider>
                </SafeAreaProvider>
            </ThemeProvider>
        </GhostProvider>
    </Provider>
);

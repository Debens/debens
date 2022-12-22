import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableFreeze, enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';

import { GhostProvider } from '@debens/mobile-atoms';
import { ThemeProvider, themes } from '@debens/theme';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './navigation/AppNavigator';
import store from './redux/store';

enableScreens();
enableFreeze();

export const App = () => (
    <Provider store={store}>
        <GhostProvider>
            <ThemeProvider theme={themes.light}>
                <SafeAreaProvider>
                    <NavigationContainer>
                        <AppNavigator />
                    </NavigationContainer>
                </SafeAreaProvider>
            </ThemeProvider>
        </GhostProvider>
    </Provider>
);

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableFreeze, enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';

import { GraphQLProvider } from '@debens/graphql';
import { GhostProvider } from '@debens/mobile-atoms';
import { SnackbarView } from '@debens/mobile-messaging';
import { NavigationProvider } from '@debens/mobile-navigation';
import { ThemeProvider, themes } from '@debens/theme';

import { client } from './graphql/apollo-client';
import AppNavigator from './navigation/AppNavigator';
import store from './redux/store';

enableScreens();
enableFreeze();

export const App = () => (
    <GraphQLProvider client={client}>
        <Provider store={store}>
            <GhostProvider>
                <ThemeProvider theme={themes.light}>
                    <SafeAreaProvider>
                        <NavigationProvider>
                            <SnackbarView>
                                <AppNavigator />
                            </SnackbarView>
                        </NavigationProvider>
                    </SafeAreaProvider>
                </ThemeProvider>
            </GhostProvider>
        </Provider>
    </GraphQLProvider>
);

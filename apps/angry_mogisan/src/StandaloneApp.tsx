import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableFreeze, enableScreens } from 'react-native-screens';

import { GhostProvider } from '@debens/mobile-atoms';
import { NavigationContainer } from '@react-navigation/native';

import App from './App';
import { AppRoute } from './navigation/routes';

enableScreens();
enableFreeze();

export const StandaloneApp = () => {
    return (
        <NavigationContainer>
            <SafeAreaProvider>
                <GhostProvider>
                    <App initialRouteName={AppRoute.Landing} />
                </GhostProvider>
            </SafeAreaProvider>
        </NavigationContainer>
    );
};

export default StandaloneApp;

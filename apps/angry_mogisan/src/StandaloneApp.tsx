import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableFreeze, enableScreens } from 'react-native-screens';

import { GhostProvider } from '@debens/mobile-atoms';
import { NavigationContainer } from '@react-navigation/native';

enableScreens();
enableFreeze();

export const StandaloneApp = () => {
    console.error('RENDERED');
    return (
        <NavigationContainer>
            <SafeAreaProvider>
                <GhostProvider>
                    <StandaloneApp />
                </GhostProvider>
            </SafeAreaProvider>
        </NavigationContainer>
    );
};

export default StandaloneApp;

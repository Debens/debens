import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableFreeze, enableScreens } from 'react-native-screens';

import { NavigationContainer } from '@react-navigation/native';
import { OnboardingNavigator } from '@training/mobile-onboarding';
import { ThemeProvider, themes } from '@training/theme';

enableScreens();
enableFreeze();

export const App = () => {
    return (
        <ThemeProvider theme={themes.light}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <OnboardingNavigator />
                </NavigationContainer>
            </SafeAreaProvider>
        </ThemeProvider>
    );
};

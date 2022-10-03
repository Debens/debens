import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableFreeze, enableScreens } from 'react-native-screens';

import { NavigationContainer } from '@react-navigation/native';
import { GhostProvider } from '@training/mobile-atoms';
import { ThemeProvider, themes } from '@training/theme';

import FaceProvider from './components/FaceProvider/FaceProvider';
import { facebook } from './face-book';
import { FacePackType } from './face-pack/model';
import AppNavigator from './navigation/AppNavigator';

enableScreens();
enableFreeze();

export const App = () => {
    return (
        <FaceProvider source={facebook} pack={FacePackType.Mogan}>
            <GhostProvider>
                <ThemeProvider theme={themes.mógan}>
                    <SafeAreaProvider>
                        <NavigationContainer>
                            <AppNavigator />
                        </NavigationContainer>
                    </SafeAreaProvider>
                </ThemeProvider>
            </GhostProvider>
        </FaceProvider>
    );
};

export default App;

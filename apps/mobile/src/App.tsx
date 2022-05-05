import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableFreeze, enableScreens } from 'react-native-screens';

import { NavigationContainer } from '@react-navigation/native';
import { Button, Grid, Layer, Paragraph, Screen } from '@training/mobile-atoms';
import { ThemeProvider, themes } from '@training/theme';

enableScreens();
enableFreeze();

export const App = () => {
    return (
        <ThemeProvider theme={themes.light}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <Screen bottom="$layer-01">
                        <Grid flex={1} justifyContent="center" alignItems="center">
                            <Paragraph>Welcome.</Paragraph>
                        </Grid>

                        <Layer padding="large">
                            <Button marginBottom="small">Login</Button>
                            <Button variant="secondary">Sign up</Button>
                        </Layer>
                    </Screen>
                </NavigationContainer>
            </SafeAreaProvider>
        </ThemeProvider>
    );
};

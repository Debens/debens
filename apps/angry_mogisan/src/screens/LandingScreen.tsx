import React, { memo, useCallback } from 'react';

import { Button, Grid, Paragraph, Screen } from '@debens/mobile-atoms';
import { useNavigation } from '@react-navigation/native';

import { AppRoute } from '../navigation/routes';

export const LandingScreen: React.FunctionComponent = () => {
    const navigation = useNavigation();

    const onStart = useCallback(() => {
        navigation.navigate(AppRoute.Game);
    }, []);

    const onSettings = useCallback(() => {
        navigation.navigate(AppRoute.Settings);
    }, []);

    return (
        <Screen>
            <Grid flex={1} variant="gutter" marginBottom="small">
                <Grid flex={1} variant="center">
                    <Paragraph typeset="$heading">Angry Mogisán</Paragraph>
                </Grid>
                <Button onPress={onStart}>Start</Button>
                <Button variant="secondary" onPress={onSettings} mt="small">
                    Settings
                </Button>
            </Grid>
        </Screen>
    );
};

export default memo(LandingScreen);

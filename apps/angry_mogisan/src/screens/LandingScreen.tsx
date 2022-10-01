import React, { memo, useCallback } from 'react';

import { useNavigation } from '@react-navigation/core';
import { Button, Grid, Paragraph, Screen } from '@training/mobile-atoms';

import { AppRoute } from '../navigation/routes';

export const LandingScreen: React.FunctionComponent = () => {
    const navigation = useNavigation();

    const onStart = useCallback(() => {
        navigation.navigate(AppRoute.Game);
    }, []);

    return (
        <Screen>
            <Grid flex={1} variant="gutter" marginBottom="small">
                <Grid flex={1} variant="center">
                    <Paragraph typeset="$heading">Angry Mogisán</Paragraph>
                </Grid>
                <Button onPress={onStart}>Start</Button>
            </Grid>
        </Screen>
    );
};

export default memo(LandingScreen);

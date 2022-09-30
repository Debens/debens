import React, { memo, useCallback } from 'react';

import { useNavigation } from '@react-navigation/core';
import { Button, Grid, Screen } from '@training/mobile-atoms';

import { AppRoute } from '../navigation/routes';

export const GameScreen: React.FunctionComponent = () => {
    const navigation = useNavigation();

    const onStop = useCallback(() => {
        navigation.navigate(AppRoute.Landing);
    }, []);

    return (
        <Screen>
            <Grid variant="gutter" flex={1} justifyContent="flex-end" marginBottom="small">
                <Button variant="secondary" onPress={onStop}>
                    Stop
                </Button>
            </Grid>
        </Screen>
    );
};

export default memo(GameScreen);

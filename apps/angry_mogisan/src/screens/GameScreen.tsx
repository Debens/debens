import React, { useCallback } from 'react';

import { useNavigation } from '@react-navigation/core';
import { Grid, Screen, SVG, Toolbar } from '@training/mobile-atoms';

import Board from '../components/Board/Board';
import { useBoard, useResetHandler } from '../components/GameProvider/game-hooks';
import { withGame } from '../components/GameProvider/GameProvider';
import { AppRoute } from '../navigation/routes';

export const GameScreen: React.FunctionComponent = () => {
    const { navigate } = useNavigation();

    const onStop = useCallback(() => {
        navigate(AppRoute.Landing);
    }, [navigate]);

    const onSettings = useCallback(() => {
        navigate(AppRoute.Settings);
    }, [navigate]);

    const board = useBoard();
    const onReset = useResetHandler();

    return (
        <Screen marginY="medium">
            <Toolbar>
                <Toolbar.Item onPress={onStop}>
                    <SVG.ChevronLeft />
                </Toolbar.Item>
                <Toolbar.Item onPress={onSettings}>
                    <SVG.Settings />
                </Toolbar.Item>
                <Toolbar.Item onPress={onReset}>
                    <SVG.Refresh />
                </Toolbar.Item>
            </Toolbar>
            <Grid flex={1} variant="gutter">
                <Grid flex={1} variant="center">
                    <Board flex={1} state={board} />
                </Grid>
            </Grid>
        </Screen>
    );
};

export default withGame(GameScreen);

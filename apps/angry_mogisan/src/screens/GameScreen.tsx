import React, { useCallback } from 'react';
import Haptic from 'react-native-haptic-feedback';

import { useNavigation } from '@react-navigation/core';
import { Grid, Screen, SVG, Toolbar } from '@training/mobile-atoms';

import Board from '../components/Board/Board';
import FinalFace from '../components/FinalFace/FinalFace';
import { GameStatus } from '../components/GameProvider/game-context';
import {
    useBoard,
    useEndEffect,
    useGameStatus,
    useResetHandler,
    useSelectEffect,
} from '../components/GameProvider/game-hooks';
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
    const status = useGameStatus();

    useSelectEffect(() => {
        Haptic.trigger('soft');
    });

    useEndEffect(() => {
        Haptic.trigger('rigid');
    });

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
                    <Board zIndex={0} flex={1} state={board} />
                    {status === GameStatus.Resolved && <FinalFace zIndex={1} onPress={onReset} />}
                </Grid>
            </Grid>
        </Screen>
    );
};

export default withGame(GameScreen);

import { EffectCallback, useCallback, useContext, useEffect, useMemo } from 'react';

import { context, FaceEmotion, GameStatus } from './game-context';

export const useGameContext = () => useContext(context);

export const useGameStatus = () => useGameContext().status;

export const useBoard = () => useGameContext().board;

export const useCurrentPosition = () => useGameContext().current;

export const useFinalPosition = () => useGameContext().final;

export const useResetHandler = () => useGameContext().onReset;

export const useSelectHandler = () => useGameContext().onSelect;

export const useFace = (x: number, y: number) => useBoard()[y]![x];

export const useSelectEffect = (fn: EffectCallback) => {
    const status = useGameStatus();
    const current = useCurrentPosition();
    useEffect(() => {
        if (status === GameStatus.Running) fn();
    }, [status, current, fn]);
};

export const useEndEffect = (fn: EffectCallback) => {
    const status = useGameStatus();
    useEffect(() => {
        if (status === GameStatus.Resolved) fn();
    }, [status, fn]);
};

export const useFinalCheck = () => {
    const final = useFinalPosition();

    return useCallback(
        (x: number, y: number) => {
            return JSON.stringify([x, y]) === JSON.stringify(final);
        },
        [final],
    );
};

export const useFaceEmotion = (x: number, y: number) => {
    const selected = useFace(x, y);
    const isFinal = useFinalCheck();

    return useMemo<FaceEmotion>(() => {
        if (selected) {
            return isFinal(x, y) ? FaceEmotion.Angry : FaceEmotion.Calm;
        } else {
            return FaceEmotion.Neutral;
        }
    }, [selected, x, y, isFinal]);
};

import {
    DependencyList,
    EffectCallback,
    useCallback,
    useContext,
    useEffect,
    useMemo,
} from 'react';

import { context, FaceEmotion, GameStatus } from './game-context';

export const useGameContext = () => useContext(context);

export const useGameStatus = () => useGameContext().status;

export const useBoard = () => useGameContext().board;

export const useSeed = () => useGameContext().seed;

export const useCurrentPosition = () => useGameContext().current;

export const useFinalPosition = () => useGameContext().final;

export const useResetHandler = () => useGameContext().onReset;

export const useSelectHandler = () => useGameContext().onSelect;

export const useFaceValue = (x: number, y: number) => useBoard()[y]![x];

export const usePositionCount = () => useBoard().flat().length;

export const useSelectEffect = (fn: EffectCallback, deps: DependencyList = []) => {
    const status = useGameStatus();
    const current = useCurrentPosition();
    const callback = useCallback(fn, deps);
    useEffect(() => {
        if (status === GameStatus.Running) callback();
    }, [status, current, callback]);
};

export const useEndEffect = (fn: EffectCallback) => {
    const status = useGameStatus();
    useEffect(() => {
        if (status === GameStatus.Resolved) fn();
    }, [status, fn]);
};

export const useStartEffect = (fn: EffectCallback) => {
    const status = useGameStatus();
    useEffect(() => {
        if (status === GameStatus.Ready) fn();
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
    const selected = useFaceValue(x, y);
    const isFinal = useFinalCheck();

    return useMemo<FaceEmotion>(() => {
        if (selected) {
            return isFinal(x, y) ? FaceEmotion.Angry : FaceEmotion.Calm;
        } else {
            return FaceEmotion.Neutral;
        }
    }, [selected, x, y, isFinal]);
};

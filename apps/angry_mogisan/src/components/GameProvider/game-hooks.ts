import { useContext, useMemo } from 'react';

import { context, FaceEmotion, GameStatus } from './game-context';

export const useGameContext = () => useContext(context);

export const useGameStatus = () => useGameContext().status;

export const useBoard = () => useGameContext().board;

export const useCurrentPosition = () => useGameContext().current;

export const useFinalPosition = () => useGameContext().final;

export const useResetHandler = () => useGameContext().onReset;

export const useSelectHandler = () => useGameContext().onSelect;

export const useFace = (x: number, y: number) => useBoard()[y]![x];

export const useFaceEmotion = (x: number, y: number) => {
    const status = useGameStatus();
    const selected = useFace(x, y);

    return useMemo<FaceEmotion>(() => {
        if (selected) {
            if (status === GameStatus.Resolved) {
                return FaceEmotion.Angry;
            } else {
                return FaceEmotion.Calm;
            }
        } else {
            return FaceEmotion.Neutral;
        }
    }, [selected, status]);
};

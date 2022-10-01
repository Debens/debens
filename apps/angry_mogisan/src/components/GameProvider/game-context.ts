import { createContext } from 'react';

export enum GameStatus {
    Ready = 'ready',
    Running = 'running',
    Resolved = 'resolved',
}

export enum FaceEmotion {
    Neutral = 'neutral',
    Calm = 'calm',
    Angry = 'angry',
}

export interface GameState {
    status: GameStatus;
    board: boolean[][];
    current: [number, number] | undefined;
    final: [number, number];
    onSelect: (x: number, y: number) => void;
    onReset: () => void;
}

export const ROW_COUNT = 4;
export const COLUMN_COUNT = 4;

export const ROWS = Array.from<boolean>({ length: COLUMN_COUNT }).map(() => false);
export const START_MATRIX = Array.from<boolean[]>({ length: ROW_COUNT }).map(() => [...ROWS]);

export const getInitialState = (): typeof START_MATRIX => JSON.parse(JSON.stringify(START_MATRIX));

const noop = () => void 0;
export const context = createContext<GameState>({
    status: GameStatus.Ready,
    board: getInitialState(),
    current: undefined,
    final: [0, 0],
    onSelect: noop,
    onReset: noop,
});

export default context;

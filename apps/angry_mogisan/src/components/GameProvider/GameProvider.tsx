import React, {
    createContext,
    memo,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';

import { SemanticColor } from '../../../../../packages/theme/src';

const ROW_COUNT = 4;
const COLUMN_COUNT = 4;

const ROWS = Array.from<boolean>({ length: COLUMN_COUNT }).map(() => false);
const START_MATRIX = Array.from<boolean[]>({ length: ROW_COUNT }).map(() => [...ROWS]);

export const getInitialState = (): typeof START_MATRIX => JSON.parse(JSON.stringify(START_MATRIX));

export enum Status {
    Ready = 'ready',
    Running = 'running',
    Resolved = 'resolved',
}

export enum FaceState {
    Normal = 'normal',
    Calm = 'calm',
    Angry = 'angry',
}

interface GameState {
    status: Status;
    board: boolean[][];
    current: [number, number] | undefined;
    final: [number, number];
    onSelect: (x: number, y: number) => void;
    onReset: () => void;
}

const noop = () => void 0;
const context = createContext<GameState>({
    status: Status.Ready,
    board: getInitialState(),
    current: undefined,
    final: [0, 0],
    onSelect: noop,
    onReset: noop,
});

export const useGameContext = () => useContext(context);

export const useStatus = () => useGameContext().status;

export const useBoard = () => useGameContext().board;

export const useCurrent = () => useGameContext().current;

export const useFinal = () => useGameContext().final;

export const useResetHandler = () => useGameContext().onReset;

export const useSelectHandler = () => useGameContext().onSelect;

export const useFace = (x: number, y: number) => useBoard()[y]![x];

export const useFaceState = (x: number, y: number) => {
    const status = useStatus();
    const selected = useFace(x, y);

    return useMemo<FaceState>(() => {
        if (selected) {
            if (status === Status.Resolved) {
                return FaceState.Angry;
            } else {
                return FaceState.Calm;
            }
        } else {
            return FaceState.Normal;
        }
    }, [selected, status]);
};

type GameProviderProps = React.PropsWithChildren;

const getRandom = (max: number) => Math.floor(Math.random() * (max + 1));

const MAX_FINAL = [ROW_COUNT, COLUMN_COUNT] as const;
const getNewFinal = (): [number, number] =>
    MAX_FINAL.map(count => count - 1).map(getRandom) as [number, number];

const GameProvider: React.FunctionComponent<GameProviderProps> = props => {
    const [current, setCurrent] = useState<[number, number]>();
    const [final, setFinal] = useState<[number, number]>(getNewFinal());
    const [board, setBoard] = useState(getInitialState());

    const onReset = useCallback(() => {
        setCurrent(undefined);
        setFinal(getNewFinal());
        setBoard(getInitialState());
    }, []);

    const status = useMemo(() => {
        if (!current) {
            return Status.Ready;
        } else {
            return JSON.stringify(current) === JSON.stringify(final) ? Status.Resolved : Status.Running;
        }
    }, [current, final]);

    const onSelect = useCallback(
        (x: number, y: number) => {
            if (status !== Status.Resolved) setCurrent([x, y]);
        },
        [status],
    );

    useEffect(() => {
        if (current) {
            const [x, y] = current;
            setBoard(state => {
                const row = state[y];
                if (row) row[x] = true;

                return [...state];
            });
        }
    }, [current, status]);

    return (
        <context.Provider value={{ status, board, current, final, onSelect, onReset }}>
            {props.children}
        </context.Provider>
    );
};

export const withGame = <P extends object>(Component: React.ComponentType<P>) => {
    const Wrapped = (props: P) => (
        <GameProvider>
            <Component {...props} />
        </GameProvider>
    );

    Wrapped.displayName = `withGame(${Component.displayName})`;

    return memo(Wrapped);
};

export default GameProvider;

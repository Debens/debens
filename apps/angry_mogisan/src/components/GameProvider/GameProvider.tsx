import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import context, {
    COLUMN_COUNT,
    GameStatus,
    getInitialState,
    ROW_COUNT,
} from './game-context';

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
            return GameStatus.Ready;
        } else {
            return JSON.stringify(current) === JSON.stringify(final)
                ? GameStatus.Resolved
                : GameStatus.Running;
        }
    }, [current, final]);

    const onSelect = useCallback(
        (x: number, y: number) => {
            if (status !== GameStatus.Resolved && !board[y]?.[x]) setCurrent([x, y]);
        },
        [status, board],
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

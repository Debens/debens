import { createContext } from 'react';

export interface RadioState<T = unknown> {
    values: T[];
    selected?: T;
    onSelect: (value: T) => void;
}

const noop = () => void 0;
export const context = createContext<RadioState>({
    values: [],
    onSelect: noop,
});

export default context;

import { createContext } from 'react';

export interface ScaleState {
    scaling: number;
}

export const context = createContext<ScaleState>({
    scaling: 0,
});

export default context;

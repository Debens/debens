import React, { createContext, useContext } from 'react';
import { SharedValue, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

import * as easing from '../../utils/easing';

interface GhostContext {
    animation: SharedValue<number>;
}

const context = createContext<GhostContext>({
    animation: { value: 1 },
});

export const useGhosts = () => useContext(context);

export type GhostProviderProps = { children: React.ReactNode };

export const GhostProvider: React.FunctionComponent<GhostProviderProps> = props => {
    const animation = useSharedValue(1);

    animation.value = withRepeat(withTiming(0.64, { duration: 800, easing: easing.sharp }), -1, true);

    return <context.Provider value={{ animation }}>{props.children}</context.Provider>;
};

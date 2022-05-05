import { DefaultTheme, ThemedStyledProps } from 'styled-components';

export interface DebugProps {
    debug?: boolean | string;
}

export const debug = (props: ThemedStyledProps<DebugProps, DefaultTheme>) => {
    if (!props.debug) return;

    return {
        backgroundColor: typeof props.debug === 'string' ? props.debug : 'lightsalmon',
        borderWidth: 1,
        borderColor: 'red',
        borderStyle: 'dashed',
    };
};

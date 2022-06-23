import { DefaultTheme, ThemedStyledProps } from 'styled-components';

export interface ColorProps {
    debug?: boolean | string;
}

export const color = (props: ThemedStyledProps<ColorProps, DefaultTheme>) => {
    if (!props.debug) return;

    return {
        backgroundColor: typeof props.debug === 'string' ? props.debug : 'lightsalmon',
        borderWidth: 1,
        borderColor: 'red',
        borderStyle: 'dashed',
    };
};

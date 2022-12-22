import { Theme } from '@debens/theme';

import { colord } from 'colord';
import { DefaultTheme, ThemedStyledProps } from 'styled-components';
import * as system from 'styled-system';

export interface DisabledProps extends system.ColorProps<Theme> {
    disabled?: boolean | null;
}

export const disabled = (props: ThemedStyledProps<DisabledProps, DefaultTheme>) => {
    if (!props.disabled) return;

    const { backgroundColor } = system.color(props);
    return {
        backgroundColor: colord(backgroundColor).lighten(0.3).desaturate(0.5).toRgbString(),
    };
};

import { Theme } from '@debens/theme';

import * as system from 'styled-system';

export interface TypographyProps extends system.TypographyProps<Theme> {
    typeset?: keyof Theme['typography'];
}

export const typography: system.styleFn = props =>
    system.compose(
        system.typography,
        system.variant({
            prop: 'typeset',
            variants: system.get(props.theme, 'typography'),
        }),
    )(props);

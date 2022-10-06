import { Theme } from '@debens/theme';

import * as system from 'styled-system';

type GridVariantToken = 'gutter' | 'center';

type GridVariantProps = system.SpaceProps<Theme> & system.LayoutProps<Theme> & system.FlexboxProps<Theme>;

export type GridsProps = {
    variant?: GridVariantToken;
};

const variants: Record<GridVariantToken, GridVariantProps> = {
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    gutter: {
        alignSelf: 'center',
        paddingX: 'medium',
        maxWidth: 400,
        width: '100%',
    },
};

export const grids = system.compose(
    system.space,
    system.layout,
    system.flexbox,
    system.variant({
        prop: 'variant',
        variants,
    }),
);

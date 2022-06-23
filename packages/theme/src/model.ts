import { ColorToken } from './tokens/color';

import type { RadiiToken } from './tokens/radii';
import type { SpacingToken } from './tokens/spacing';
import type { TypographyToken, TypeSet } from './tokens/typography';

import type { Theme as BaseTheme } from 'styled-system';

import type { DeepPartial } from '@training/utils';

export type SemanticColor = `${ColorToken}`;
export type SemanticRadii = `${RadiiToken}`;
export type SemanticSpacing = `${SpacingToken}`;

export interface Theme extends BaseTheme {
    colors: Record<`${ColorToken}`, string>;
    radii: Record<`${RadiiToken}`, number>;
    space: Record<`${SpacingToken}`, number | string>;
    typography: Record<`${TypographyToken}`, TypeSet>;
    contextual: {
        [Key in `${ColorToken}`]?: DeepPartial<Exclude<Theme, 'contextual'>>;
    };
}

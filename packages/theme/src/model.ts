import { BorderToken } from './tokens/border';
import { ColorToken } from './tokens/color';

import type { RadiiToken } from './tokens/radii';
import type { SpacingToken } from './tokens/spacing';
import type { TypographyToken, TypeSet, FontWeightToken } from './tokens/typography';

import type { Theme as BaseTheme } from 'styled-system';

import type { DeepPartial } from '@debens/utils';

export type SemanticColor = `${ColorToken}`;
export type SemanticRadii = `${RadiiToken}`;
export type SemanticSpacing = `${SpacingToken}`;

export interface Theme extends BaseTheme {
    borderWidths: Record<`${BorderToken}`, number>;
    colors: Record<`${ColorToken}`, string>;
    radii: Record<`${RadiiToken}`, number>;
    space: Record<`${SpacingToken}`, number | string>;
    fontWeights: Record<`${FontWeightToken}`, number>;
    typography: Record<`${TypographyToken}`, TypeSet>;
    contextual: {
        [Key in `${ColorToken}`]?: DeepPartial<Exclude<Theme, 'contextual'>>;
    };
}

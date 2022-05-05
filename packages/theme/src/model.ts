import type { ColorToken } from './tokens/color';
import type { RadiiToken } from './tokens/radii';
import type { SpacingToken } from './tokens/spacing';
import type { TypographyToken, TypeSet } from './tokens/typography';

import type { Theme as DefaultTheme } from 'styled-system';

export type SemanticColor = `${ColorToken}`;
export type SemanticRadii = `${RadiiToken}`;
export type SemanticSpacing = `${SpacingToken}`;

export interface Theme extends DefaultTheme {
    colors: Record<`${ColorToken}`, string>;
    radii: Record<`${RadiiToken}`, number>;
    space: Record<`${SpacingToken}`, number | string>;
    typography: Record<`${TypographyToken}`, TypeSet>;
}

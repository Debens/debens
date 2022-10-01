import { light } from './themes/light/light';
import { mógan } from './themes/mogan/mogan';

export * from '@styled-system/should-forward-prop';
export { ThemeProvider, useTheme } from 'styled-components';

export const themes = { light, mógan };

export * from './model';

export * from './tokens/color';
export * from './tokens/radii';
export * from './tokens/spacing';
export * from './tokens/typography';

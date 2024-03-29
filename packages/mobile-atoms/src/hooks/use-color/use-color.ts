import { SemanticColor } from '@debens/theme';

import { useTheme } from 'styled-components';
import { get } from 'styled-system';

export const useColor = (color?: SemanticColor): string => {
    const theme = useTheme();
    return color ? get(theme.colors, color) : undefined;
};

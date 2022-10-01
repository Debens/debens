import { SemanticSpacing } from '@training/theme';

import { useTheme } from 'styled-components';
import { get } from 'styled-system';

export const useSpacing = (spacing?: SemanticSpacing): number | undefined => {
    const theme = useTheme();
    return spacing ? get(theme.space, spacing) : undefined;
};

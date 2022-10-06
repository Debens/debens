import React, { memo, useMemo } from 'react';

import { SemanticColor, ThemeProvider, useTheme } from '@debens/theme';

import merge from 'deepmerge';
import { ResponsiveValue } from 'styled-system';

type ThemeBoundaryProps = React.PropsWithChildren<{
    context?: ResponsiveValue<SemanticColor>;
}>;

const ThemeBoundary: React.FunctionComponent<ThemeBoundaryProps> = props => {
    const { context } = props;

    const theme = useTheme();
    const next = useMemo(() => {
        const amendment = typeof context === 'string' ? theme.contextual[context] : undefined;
        return amendment ? merge<typeof theme, typeof amendment>(theme, amendment) : theme;
    }, [theme, context]);

    return next ? <ThemeProvider theme={next}>{props.children}</ThemeProvider> : <>{props.children}</>;
};

export default memo(ThemeBoundary);

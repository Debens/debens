import React, { memo } from 'react';

import { SemanticColor } from '@debens/theme';

import Grid, { GridProps } from '../Grid/Grid';

export interface ThematicBreakProps extends GridProps {
    color?: SemanticColor;
}

export const ThematicBreak: React.FunctionComponent<ThematicBreakProps> = props => {
    const { color, ...grid } = props;

    return (
        <Grid {...grid}>
            <Grid borderColor={color} borderTopWidth="small" />
        </Grid>
    );
};

ThematicBreak.defaultProps = {
    color: '$background-active',
};

export default memo(ThematicBreak);

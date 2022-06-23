import React, { memo } from 'react';

import Grid, { GridProps } from '../Grid/Grid';
import ThemeBoundary from '../ThemeBoundary/ThemeBoundary';

const Layer: React.FunctionComponent<GridProps> = props => {
    const backgroundColor = props.backgroundColor ?? props.bg;

    return (
        <ThemeBoundary context={backgroundColor}>
            <Grid {...props} />
        </ThemeBoundary>
    );
};

Layer.defaultProps = {
    borderTopLeftRadius: 'large',
    borderTopRightRadius: 'large',
    backgroundColor: '$layer-01',
};

export default memo(Layer);

import React, { memo } from 'react';

import Grid, { GridProps } from '../Grid/Grid';

const Layer: React.FunctionComponent<GridProps> = props => <Grid {...props} />;

Layer.defaultProps = {
    borderTopLeftRadius: 'large',
    borderTopRightRadius: 'large',
    backgroundColor: '$layer-01',
};

export default memo(Layer);

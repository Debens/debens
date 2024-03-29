import React, { memo } from 'react';

import Grid, { GridProps } from '../Grid/Grid';

export const Break: React.FunctionComponent<GridProps> = props => <Grid {...props} />;

Break.defaultProps = {
    margin: 'medium',
    borderBottomWidth: 'small',
    borderColor: '$layer-hover-01',
};

export default memo(Break);

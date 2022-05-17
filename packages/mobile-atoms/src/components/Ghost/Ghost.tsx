import React, { memo } from 'react';
import { useAnimatedStyle } from 'react-native-reanimated';

import Grid, { GridProps } from '../Grid/Grid';

import { useGhosts } from './GhostProvider';

export type GhostProps = GridProps;

export const Ghost: React.FC<GhostProps> = props => {
    const { animation } = useGhosts();

    const style = useAnimatedStyle(() => ({ opacity: animation.value }));

    return (
        <Grid.Animated style={style} {...props}>
            {props.children}
        </Grid.Animated>
    );
};

Ghost.defaultProps = {
    backgroundColor: '$ghost',
    borderRadius: 'large',
};

export default memo(Ghost);

import React from 'react';
import { useAnimatedStyle } from 'react-native-reanimated';

import { Theme } from '@debens/theme';

import { useTheme } from 'styled-components';
import * as system from 'styled-system';

import Grid, { GridProps } from '../Grid/Grid';

import { useGhosts } from './GhostProvider';

export type GhostProps = GridProps;

export interface Ghost extends React.FunctionComponent<GhostProps> {
    Text: React.FunctionComponent<GhostTextProps>;
}

export const Ghost: Ghost = props => {
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

export type GhostTextProps = GhostProps & {
    typeset: keyof Theme['typography'];
    chars: number;
};

const GOLDEN_RATIO = 1.618;
const GhostText: Ghost['Text'] = props => {
    const typeset = system.get(useTheme(), 'typography')?.[props.typeset];
    const width = (typeset?.fontSize * props.chars) / GOLDEN_RATIO;
    return <Ghost height={typeset?.lineHeight} width={width} {...props} />;
};

Ghost.Text = GhostText;

export default Ghost;

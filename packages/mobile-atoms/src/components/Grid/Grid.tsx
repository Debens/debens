import React from 'react';
import Animated from 'react-native-reanimated';

import shouldForwardProp from '@styled-system/should-forward-prop';
import { Theme } from '@training/theme';

import styled from 'styled-components/native';
import * as system from 'styled-system';

import * as custom from '../../utils/style-functions';
import { StyledProps } from '../../utils/styled-components/styled-props';

type ViewProps = StyledProps<typeof styled.View>;

export type GridProps = system.ColorProps<Theme> &
    system.SpaceProps<Theme> &
    system.LayoutProps<Theme> &
    system.BorderProps<Theme> &
    system.FlexboxProps<Theme> &
    custom.DebugProps &
    Omit<ViewProps, 'style'>;

const Component = styled.View.withConfig({
    displayName: 'Grid',
    shouldForwardProp: prop => shouldForwardProp(prop),
})<GridProps>`
    ${system.color}
    ${system.space}
    ${system.layout}
    ${system.border}
    ${system.flexbox}
    ${custom.debug}
`;

class Grid extends React.PureComponent<GridProps> {
    static Animated = Animated.createAnimatedComponent(Grid);

    render(): React.ReactNode {
        return <Component {...this.props} />;
    }
}

export default Grid;

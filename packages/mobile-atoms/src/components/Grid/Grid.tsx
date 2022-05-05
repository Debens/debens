import shouldForwardProp from '@styled-system/should-forward-prop';
import { Theme } from '@training/theme';

import styled from 'styled-components/native';
import * as system from 'styled-system';

import * as custom from '../../utils/style-functions';

export type GridProps = React.PropsWithChildren<
    | system.ColorProps<Theme>
    | system.SpaceProps<Theme>
    | system.LayoutProps<Theme>
    | system.BorderProps<Theme>
    | system.FlexboxProps<Theme>
    | custom.DebugProps
>;

const Grid = styled.View.withConfig({
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

export default Grid;

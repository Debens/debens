import { Theme } from '@debens/theme';
import shouldForwardProp from '@styled-system/should-forward-prop';

import styled from 'styled-components/native';
import * as system from 'styled-system';

import * as custom from '../../utils/style-functions';

export type ParagraphProps = React.PropsWithChildren<
    system.ColorProps<Theme> | system.SpaceProps<Theme> | custom.TypographyProps
>;

const Paragraph = styled.Text.withConfig({
    displayName: 'Paragraph',
    shouldForwardProp: prop => shouldForwardProp(prop),
})<ParagraphProps>`
    ${system.color}
    ${system.space}
    ${custom.typography}
`;

export default Paragraph;

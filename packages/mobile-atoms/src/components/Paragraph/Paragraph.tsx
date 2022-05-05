import shouldForwardProp from '@styled-system/should-forward-prop';
import { Theme } from '@training/theme';

import styled from 'styled-components/native';
import * as system from 'styled-system';

export type ParagraphProps = React.PropsWithChildren<
    system.ColorProps<Theme> | system.SpaceProps<Theme> | system.TypographyProps<Theme>
>;

const Paragraph = styled.Text.withConfig({
    displayName: 'Paragraph',
    shouldForwardProp: prop => shouldForwardProp(prop),
})<ParagraphProps>`
    ${system.color}
    ${system.space}
    ${system.typography}
`;

export default Paragraph;

import React, { useCallback, useMemo, useState } from 'react';
import { GestureResponderEvent, Pressable, PressableProps } from 'react-native';

import { SemanticColor, SemanticSpacing, Theme } from '@debens/theme';
import shouldForwardProp from '@styled-system/should-forward-prop';

import { colord, extend } from 'colord';
import mixPlugin from 'colord/plugins/mix';
import styled from 'styled-components/native';
import * as system from 'styled-system';

import { useColor } from '../../hooks/use-color/use-color';
import { useSpacing } from '../../hooks/use-spacing/use-spacing';
import * as custom from '../../utils/style-functions';
import Paragraph from '../Paragraph/Paragraph';

extend([mixPlugin]);

type ButtonVariantToken = 'primary' | 'secondary';
const variants: Record<ButtonVariantToken, StyledPressableProps> = {
    primary: {
        borderRadius: 'large',
        backgroundColor: '$button-primary',
        activeColor: '$button-primary-active',
    },
    secondary: {
        borderRadius: 'large',
        backgroundColor: '$button-secondary',
        activeColor: '$button-secondary-active',
    },
};

export type StyledPressableProps = PressableProps &
    system.ColorProps<Theme> &
    system.SpaceProps<Theme> &
    system.LayoutProps<Theme> &
    system.BorderProps<Theme> &
    system.FlexboxProps<Theme> &
    system.PositionProps<Theme> &
    custom.PressableProps &
    custom.DebugProps;

const StyledButton = styled(Pressable).withConfig({
    displayName: 'StyledButton',
    shouldForwardProp: prop => prop === 'hitSlop' || shouldForwardProp(prop),
})<StyledPressableProps>`
    ${system.color}
    ${system.space}
    ${system.layout}
    ${system.border}
    ${system.flexbox}
    ${system.position}
    ${custom.pressable}
    ${custom.debug}
    ${custom.disabled}
`;

type VariantProps<V> = { variant?: keyof V };
export type ButtonProps = React.PropsWithChildren<
    StyledPressableProps & VariantProps<typeof variants> & { hitSlop?: SemanticSpacing }
>;

const useVariant = (variant?: keyof typeof variants) =>
    useMemo(() => (variant ? variants[variant] : undefined), [variant]);

const ButtonFrame: React.FunctionComponent<ButtonProps> = props => {
    const { onPressIn, onPressOut } = props;
    const [active, setActive] = useState(false);

    const handlers = {
        onPressIn: useCallback(
            (event: GestureResponderEvent) => {
                setActive(true);
                onPressIn?.(event);
            },
            [onPressIn, setActive],
        ),
        onPressOut: useCallback(
            (event: GestureResponderEvent) => {
                setActive(false);
                onPressOut?.(event);
            },
            [onPressOut, setActive],
        ),
    };

    const variant = useVariant(props.variant);
    const button = Object.assign({}, variant, props);

    const hitSlop = useSpacing(props.hitSlop);

    return (
        <StyledButton
            active={active}
            android_ripple={{ color: useColor(props.activeColor) }}
            {...button}
            {...handlers}
            hitSlop={hitSlop}>
            {props.children}
        </StyledButton>
    );
};

export interface Button extends React.FunctionComponent<ButtonProps> {
    Frame: React.FunctionComponent<ButtonProps>;
}

export const Button: Button = props => {
    const variant = useVariant(props.variant);
    const button = Object.assign({}, variant, props);

    const color = useColor(button.backgroundColor?.toString() as SemanticColor);
    const textColor = color && colord(color).isDark() ? '$text-on-color' : '$text-primary';

    return (
        <ButtonFrame {...props}>
            <Paragraph textAlign="center" color={textColor} padding="medium">
                {props.children}
            </Paragraph>
        </ButtonFrame>
    );
};

Button.defaultProps = {
    variant: 'primary',
    accessibilityRole: 'button',
};

Button.Frame = ButtonFrame;

export default Button;

import React, { useCallback, useMemo, useState } from 'react';
import { GestureResponderEvent, Pressable, PressableProps } from 'react-native';

import shouldForwardProp from '@styled-system/should-forward-prop';
import { SemanticSpacing, Theme } from '@training/theme';

import styled from 'styled-components/native';
import * as system from 'styled-system';

import { useColor } from '../../hooks/use-color/use-color';
import { useSpacing } from '../../hooks/use-spacing/use-spacing';
import * as custom from '../../utils/style-functions';
import Paragraph from '../Paragraph/Paragraph';

type ButtonVariantToken = 'primary' | 'secondary';
const variants: Record<ButtonVariantToken, StyledPressableProps> = {
    primary: {
        borderRadius: 'large',
        backgroundColor: '$button-primary',
        activeColor: '$button-primary-active',
        color: '$text-on-color',
    },
    secondary: {
        borderRadius: 'large',
        backgroundColor: '$button-secondary',
        activeColor: '$button-secondary-active',
        color: '$text-on-color',
    },
};

export type StyledPressableProps = PressableProps &
    system.ColorProps<Theme> &
    system.SpaceProps<Theme> &
    system.LayoutProps<Theme> &
    system.BorderProps<Theme> &
    system.FlexboxProps<Theme> &
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
    ${custom.pressable}
    ${custom.debug}
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

    return (
        <ButtonFrame {...props}>
            <Paragraph textAlign="center" color={button.color} padding="medium">
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

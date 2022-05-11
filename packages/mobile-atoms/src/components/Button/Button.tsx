import React, { memo, useCallback, useMemo, useState } from 'react';
import { GestureResponderEvent, Pressable, PressableProps } from 'react-native';

import shouldForwardProp from '@styled-system/should-forward-prop';
import { Theme } from '@training/theme';

import styled from 'styled-components/native';
import * as system from 'styled-system';

import { useColor } from '../../hooks/use-color/use-color';
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
    shouldForwardProp: prop => shouldForwardProp(prop),
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
type ButtonProps = React.PropsWithChildren<StyledPressableProps & VariantProps<typeof variants>>;

const useVariant = (variant?: keyof typeof variants) =>
    useMemo(() => (variant ? variants[variant] : undefined), [variant]);

export const Button: React.FunctionComponent<ButtonProps> = props => {
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

    return (
        <StyledButton
            active={active}
            android_ripple={{ color: useColor(props.activeColor) }}
            {...button}
            {...handlers}>
            <Paragraph textAlign="center" color={button.color} padding="medium">
                {props.children}
            </Paragraph>
        </StyledButton>
    );
};

Button.defaultProps = {
    variant: 'primary',
    accessibilityRole: 'button',
};

export default memo(Button);

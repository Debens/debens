import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
    NativeSyntheticEvent,
    Pressable,
    StyleSheet,
    TextInput as BaseComponent,
    TextInputFocusEventData,
} from 'react-native';
import {
    FadeInDown,
    FadeInUp,
    FadeOutDown,
    FadeOutUp,
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

import { ColorToken } from '@debens/theme';
import shouldForwardProp from '@styled-system/should-forward-prop';

import styled from 'styled-components/native';

import { useColor } from '../../hooks/use-color/use-color';
import { acceleration, deceleration } from '../../utils/easing';
import { ENTERING, EXITING } from '../../utils/speeds';
import { StyledProps } from '../../utils/styled-components/styled-props';
import Grid, { GridProps } from '../Grid/Grid';
import Paragraph from '../Paragraph/Paragraph';

const StyledTextInput = styled.TextInput``;

type BaseProps = StyledProps<typeof styled.TextInput>;
export type TextInputProps = BaseProps &
    GridProps & {
        label?: string;
        error?: string;
    };

const TOP_ANIMATION = {
    exiting: FadeOutDown.duration(EXITING).easing(acceleration.factory()),
    entering: FadeInDown.duration(ENTERING).easing(deceleration.factory()),
};
const BOTTOM_ANIMATION = {
    exiting: FadeOutUp.duration(EXITING).easing(acceleration.factory()),
    entering: FadeInUp.duration(ENTERING).easing(deceleration.factory()),
};

const useSelection = (props: TextInputProps) => {
    const [isFocused, setFocus] = useState(false);

    const { onFocus: focus, onBlur: blur } = props;
    const onFocus = useCallback(
        (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
            setFocus(true);
            focus?.(event);
        },
        [focus],
    );
    const onBlur = useCallback(
        (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
            setFocus(false);
            blur?.(event);
        },
        [blur],
    );

    return { handlers: { onFocus, onBlur }, isFocused };
};

const getBackgroundColor = (props: TextInputProps, isFocused: boolean): `${ColorToken}` => {
    switch (true) {
        case !!props.error:
            return '$field-error-01';
        case isFocused:
            return '$field-selected-01';
        default:
            return props.backgroundColor as ColorToken;
    }
};

const useBackground = (props: TextInputProps, isFocused: boolean) => {
    const background = useColor(getBackgroundColor(props, isFocused));

    const animation = useSharedValue(0);
    const from = useSharedValue(background);
    const to = useSharedValue(background);

    useEffect(() => {
        (from.value = to.value), (to.value = background);
        animation.value = 0;
        animation.value = withTiming(1, { duration: 200 });
    }, [background]);

    return useAnimatedStyle(
        () => ({ backgroundColor: interpolateColor(animation.value, [0, 1], [from.value, to.value]) }),
        [],
    );
};

export const TextInput: React.FunctionComponent<TextInputProps> = props => {
    const [value, setValue] = useState<string | undefined>(props.value);
    const { onChangeText: change } = props;
    const onChangeText = useCallback(
        (text: string) => {
            setValue(text);
            change?.(text);
        },
        [change],
    );

    const style = Object.fromEntries(Object.entries(props).filter(([prop]) => !shouldForwardProp(prop)));
    const input = Object.fromEntries(Object.entries(props).filter(([prop]) => shouldForwardProp(prop)));

    const ref = useRef<BaseComponent>(null);
    const onPress = useCallback(() => {
        ref.current?.focus();
    }, []);

    const { handlers: selection, isFocused } = useSelection(props);
    const background = useBackground(props, isFocused);
    return (
        <>
            <Grid.Animated key={`${props.testID}:top:${!!value}`} {...TOP_ANIMATION} marginBottom="miniscule">
                <Paragraph typeset="$body" color="$text-placeholder" marginLeft="medium">
                    {value ? props.label : ' '}
                </Paragraph>
            </Grid.Animated>
            <Pressable style={styles.front} onPress={onPress}>
                <Grid.Animated style={background} {...style} marginY="miniscule">
                    <StyledTextInput
                        ref={ref as unknown as any}
                        placeholder={props.label}
                        {...input}
                        {...selection}
                        onChangeText={onChangeText}
                    />
                </Grid.Animated>
            </Pressable>
            <Grid flexDirection="row">
                <Grid.Animated
                    key={`${props.testID}:bottom:error:${!!props.error}`}
                    {...BOTTOM_ANIMATION}
                    marginTop="miniscule">
                    <Paragraph typeset="$body" color="$text-error" marginLeft="medium">
                        {props.error ? props.error : ' '}
                    </Paragraph>
                </Grid.Animated>
                <Grid.Animated
                    key={`${props.testID}:bottom:${!!value && !!props.maxLength}`}
                    {...BOTTOM_ANIMATION}
                    marginTop="miniscule"
                    marginLeft="auto">
                    <Paragraph typeset="$body" color="$text-placeholder" marginRight="medium">
                        {!!value && !!props.maxLength ? `${value.length}/${props.maxLength}` : ' '}
                    </Paragraph>
                </Grid.Animated>
            </Grid>
        </>
    );
};

TextInput.defaultProps = {
    borderRadius: 'large',
    padding: 'medium',
    backgroundColor: '$field-01',
};

const styles = StyleSheet.create({
    front: { zIndex: 1 },
});

export default memo(TextInput);

import { Platform } from 'react-native';

import { SemanticColor } from '@training/theme';

import { DefaultTheme, ThemedStyledProps } from 'styled-components';
import * as system from 'styled-system';

export interface PressableProps {
    active?: boolean;
    activeColor?: SemanticColor;
}

export const pressable = (props: ThemedStyledProps<PressableProps, DefaultTheme>) =>
    props.active && props.activeColor
        ? // android should use android_ripple pressable prop
          Platform.select({
              ios: { backgroundColor: system.get(props.theme.colors, props.activeColor) },
          })
        : undefined;

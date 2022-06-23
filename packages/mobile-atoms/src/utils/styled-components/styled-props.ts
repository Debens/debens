import { ReactNativeThemedStyledFunction } from 'styled-components/native';

export type StyledComponent<T> = T extends ReactNativeThemedStyledFunction<infer C, any> ? C : never;

export type StyledProps<T> = React.ComponentProps<StyledComponent<T>>;

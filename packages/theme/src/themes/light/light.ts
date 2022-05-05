import type { Theme } from '../../model';
import {
    FontFamily,
    FontSize,
    FontWeight,
    LineHeight,
    TypeSet,
} from '../../tokens/typography';
import { Color } from '../../values/colors';

// FIXME: temporary, remove.
const DEFAULT_TYPE_SET: TypeSet = {
    family: FontFamily.Unknown,
    size: FontSize.Small,
    height: LineHeight.Small,
    weight: FontWeight.Normal,
};

export const light: Theme = {
    space: {
        none: 0,
        xsmall: 4,
        small: 8,
        medium: 16,
        large: 24,
        xlarge: 32,
    },
    radii: {
        none: 0,
        xsmall: 2,
        small: 4,
        medium: 8,
        large: 16,
        xlarge: 24,
    },
    colors: {
        // background
        '$background-primary': Color.White,
        '$background-active': Color.Gray30,
        '$background-brand': Color.Blue60,

        // layer
        '$layer-01': Color.Gray10,
        '$layer-hover-01': Color.Gray10Hover,
        '$layer-active-01': Color.Gray30,
        '$layer-selected-01': Color.Gray20,
        '$layer-02': Color.White,
        '$layer-hover-02': Color.Gray10Hover,
        '$layer-active-02': Color.Gray30,
        '$layer-selected-02': Color.Gray20,
        '$layer-03': Color.Gray10,
        '$layer-hover-03': Color.Gray10Hover,
        '$layer-active-03': Color.Gray30,
        '$layer-selected-03': Color.Gray20,
        '$layer-disabled': Color.Gray50,

        // text
        '$text-primary': Color.Gray100,
        '$text-secondary': Color.Gray70,
        '$text-on-color': Color.White,
        '$text-placeholder': Color.Gray40,
        '$text-disabled': Color.Gray30,
        '$text-error': Color.Red60,

        // button
        '$button-primary': Color.Blue60,
        '$button-primary-hover': Color.Blue60Hover,
        '$button-primary-active': Color.Blue80,
        '$button-secondary': Color.Gray80,
        '$button-secondary-hover': Color.Gray80Hover,
        '$button-secondary-active': Color.Gray60,
        '$button-danger': Color.Red60,
        '$button-danger-hover': Color.Red60Hover,
        '$button-danger-active': Color.Red80,
        '$button-disabled': Color.Gray30,

        // other
        $ghost: Color.Gray30,
    },
    typography: {
        $body: DEFAULT_TYPE_SET,
        $heading: DEFAULT_TYPE_SET,
    },
};

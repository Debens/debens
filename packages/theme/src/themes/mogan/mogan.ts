import type { Theme } from '../../model';
import { FontFamily, FontSize, FontWeight, LineHeight } from '../../tokens/typography';
import { Color } from '../../values/colors';

export const mógan: Theme = {
    space: {
        none: 0,
        auto: 'auto',
        miniscule: 2,
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
        $transparent: Color.None,

        // background
        '$background-primary': Color.Magenta30,
        '$background-active': Color.Magenta50,
        '$background-brand': Color.Magenta60,

        // layer
        '$layer-01': Color.Magenta20,
        '$layer-hover-01': Color.Magenta10,
        '$layer-active-01': Color.Magenta30,
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
        '$text-primary': Color.Magenta60,
        '$text-secondary': Color.White,
        '$text-on-color': Color.Magenta20,
        '$text-placeholder': Color.Gray40,
        '$text-disabled': Color.Gray30,
        '$text-error': Color.Red60,

        // button
        '$button-primary': Color.Magenta60,
        '$button-primary-hover': Color.Magenta50,
        '$button-primary-active': Color.Magenta80,
        '$button-secondary': Color.Magenta20,
        '$button-secondary-hover': Color.Magenta10,
        '$button-secondary-active': Color.Magenta30,
        '$button-danger': Color.Red60,
        '$button-danger-hover': Color.Red60Hover,
        '$button-danger-active': Color.Red80,
        '$button-disabled': Color.Gray30,

        '$field-01': Color.Magenta20,
        '$field-error-01': Color.Red20,
        '$field-selected-01': Color.Magenta60,

        // other
        $ghost: Color.Gray30,
    },
    borderWidths: {
        none: 0,
        small: 1,
    },
    typography: {
        $body: {
            fontFamily: FontFamily.Unknown,
            fontSize: FontSize.Small,
            lineHeight: LineHeight.Small,
            fontWeight: FontWeight.Light,
        },
        $heading: {
            fontFamily: FontFamily.Unknown,
            fontSize: FontSize.Large,
            lineHeight: LineHeight.Large,
            fontWeight: FontWeight.Normal,
        },
    },
    contextual: {},
};

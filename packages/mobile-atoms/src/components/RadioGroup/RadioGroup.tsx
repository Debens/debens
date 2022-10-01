import React, { useCallback, useEffect, useState } from 'react';

import context, { RadioState } from './radio-context';

export interface RadioProps<T> {
    value: T;
}

export interface RadioProviderProps<T> {
    initial?: T;
    onChange?: (value: T) => void;
    children: React.ReactElement<RadioProps<T>>[];
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const RadioGroup = <T extends unknown>(props: React.PropsWithChildren<RadioProviderProps<T>>) => {
    const { initial, onChange, children } = props;
    const [value, setValue] = useState(initial);

    const onSelect = useCallback((value: T) => {
        setValue(value);
    }, []);

    useEffect(() => {
        if (value) onChange?.(value);
    }, [onChange, value]);

    const radios = React.Children.toArray(children).filter<React.ReactElement>(React.isValidElement);
    const values = radios.map(radio => radio.props.value);

    const Provider = context.Provider as React.Provider<RadioState<T>>;
    return <Provider value={{ values: values, onSelect, selected: value }}>{children}</Provider>;
};

export default RadioGroup;

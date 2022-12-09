import { useCallback, useContext } from 'react';

import context, { RadioState } from './radio-context';

export enum RadioStatus {
    Default = 'default',
    Selected = 'selected',
    NotSelected = 'not-selected',
}

export const useRadioContext = <T>() => {
    const shared = useContext<RadioState<T>>(context as unknown as React.Context<RadioState<T>>);

    if (!shared) {
        throw new Error('useMyContext must be used under MyContextProvider');
    }

    return shared;
};

export const useRadioHandler = <T>(forValue: T) => {
    const { onSelect } = useRadioContext<T>();

    return useCallback(() => {
        onSelect(forValue);
    }, [onSelect, forValue]);
};

export const useRadioValues = <T>() => useRadioContext<T>().values;

export const useRadioSelected = <T>() => useRadioContext<T>().selected;

export const useRadioStatus = <T>(forValue: T) => {
    const selected = useRadioSelected<T>();
    const values = useRadioValues<T>();

    switch (true) {
        case selected === forValue:
            return RadioStatus.Selected;
        case values.includes(forValue):
            return RadioStatus.NotSelected;
        default:
            RadioStatus.Default;
    }
};

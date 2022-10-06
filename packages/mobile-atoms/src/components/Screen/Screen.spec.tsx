import React from 'react';
import { View } from 'react-native';

import { render, Workbench } from '@debens/mobile-testing';

import Screen from './Screen';

describe('Screen', () => {
    const { getByTestId } = render(
        <Screen>
            <View testID="child" />
        </Screen>,
        { wrapper: Workbench },
    );

    it('then should render the children', () => {
        expect(getByTestId('child')).toBeDefined();
    });
});

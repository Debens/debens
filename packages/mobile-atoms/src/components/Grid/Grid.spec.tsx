import React from 'react';
import { View } from 'react-native';

import { render, Workbench } from '@training/mobile-testing';

import Grid from './Grid';

describe('Grid', () => {
    const { getByTestId } = render(
        <Grid testID="parent">
            <View testID="child" />
        </Grid>,
        { wrapper: Workbench },
    );

    it('then should render the grid', () => {
        expect(getByTestId('parent')).toBeDefined();
    });

    it('then should render the children', () => {
        expect(getByTestId('child')).toBeDefined();
    });
});

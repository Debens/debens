import React from 'react';
import { Text, View } from 'react-native';

import { render } from '@training/mobile-testing';

import Grid from './Grid';

describe('Grid', () => {
    const { getByTestId, getByPercentage } = render(
        <Grid testID="parent">
            <View testID="child" />
            <Text>10.00%</Text>
        </Grid>,
    );

    it('then should render the grid', () => {
        expect(getByTestId('parent')).toBeDefined();
    });

    it('then should render the children', () => {
        expect(getByTestId('child')).toBeDefined();
    });

    it('then should find the percentage', () => {
        expect(getByPercentage(10)).toBeDefined();
    });
});

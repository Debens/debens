import React from 'react';

import { render } from '@training/mobile-testing';

import Grid from '../Grid/Grid';

import Layer from './Layer';

describe('Layer', () => {
    const { getByTestId } = render(
        <Layer testID="parent">
            <Grid testID="child" />
        </Layer>,
    );

    it('then should render the Layer', () => {
        expect(getByTestId('parent')).toBeDefined();
    });

    it('then should render the children', () => {
        expect(getByTestId('child')).toBeDefined();
    });
});

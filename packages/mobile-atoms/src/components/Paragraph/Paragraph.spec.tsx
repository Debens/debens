import React from 'react';

import { render, Workbench } from '@training/mobile-testing';

import Paragraph from './Paragraph';

describe('Paragraph', () => {
    const { getByText } = render(<Paragraph testID="parent">text</Paragraph>, {
        wrapper: Workbench,
    });

    it('then should render the text', () => {
        expect(getByText('text')).toBeDefined();
    });
});

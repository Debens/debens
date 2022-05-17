import React from 'react';

import { render } from '@training/mobile-testing';

import Grid from '../Grid/Grid';

import Loader from './Loader';

describe('Loader', () => {
    describe('given is loading', () => {
        const { queryByTestId, rerender } = render(
            <Loader loading>
                <Loader.Loading>
                    <Grid testID="loading" />
                </Loader.Loading>
                <Grid testID="content" />
            </Loader>,
        );

        it('should then show the loading', () => {
            expect(queryByTestId('loading')).toBeTruthy();
        });

        it('should then not show the content', () => {
            expect(queryByTestId('content')).toBeFalsy();
        });

        describe('when the loading stops', () => {
            beforeAll(() => {
                rerender(
                    <Loader>
                        <Loader.Loading>
                            <Grid testID="loading" />
                        </Loader.Loading>
                        <Grid testID="content" />
                    </Loader>,
                );
            });

            it('should then not show the loading', () => {
                expect(queryByTestId('loading')).toBeFalsy();
            });

            it('should then show the content', () => {
                expect(queryByTestId('content')).toBeTruthy();
            });
        });
    });
});

import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Snackbar } from '@debens/mobile-molecules';
import { withModules } from '@debens/toolkit-redux';

import { Grid } from '../../../../../packages/mobile-atoms/src';
import { module } from '../../module';
import snackbar, { Snackbar as SnackbarModel } from '../../snackbar';

export type SnackbarViewProps = React.PropsWithChildren;

type IntractableSnackBarProps = {
    snackbar: SnackbarModel;
    onPress(id: string): void;
};

const IntractableSnackBar: React.FunctionComponent<IntractableSnackBarProps> = props => {
    const { snackbar, onPress } = props;
    const onHandlePress = useCallback(() => {
        onPress(snackbar.id);
    }, [onPress, snackbar.id]);

    return (
        <Snackbar key={snackbar.id} {...snackbar} onPress={onHandlePress} marginX="small" marginY="xsmall" />
    );
};

const SnackbarView: React.FunctionComponent<SnackbarViewProps> = props => {
    const { children } = props;
    const snackbars = useSelector(snackbar.selectors.snackbars);

    const dispatch = useDispatch();
    const onPress = useCallback((id: string) => dispatch(snackbar.actions.hide(id)), [dispatch]);
    return (
        <>
            {children}
            <View pointerEvents="box-none" style={StyleSheet.absoluteFillObject}>
                <Grid
                    pointerEvents="box-none"
                    marginBottom="large"
                    flex={1}
                    flexDirection="column"
                    justifyContent="flex-end">
                    {snackbars.map(snackbar => (
                        <IntractableSnackBar key={snackbar.id} onPress={onPress} snackbar={snackbar} />
                    ))}
                </Grid>
            </View>
        </>
    );
};

export default withModules([module])(SnackbarView);

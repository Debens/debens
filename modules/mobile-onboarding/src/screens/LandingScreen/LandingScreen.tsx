import React, { memo, useCallback } from 'react';
import { Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Break, Button, EmailInput, Grid, Layer, Screen, SVG } from '@debens/mobile-atoms';

import { useFormik } from 'formik';
import * as yup from 'yup';

import login from '../../login';

export type LandingScreenNavigationProps = undefined;

export interface LandingScreenProps {
    onSignUp: () => void;
}

interface FormValues {
    type?: 'enter' | 'passkey';
    email: string;
}

const useSubmit = () => {
    const dispatch = useDispatch();
    return useCallback(
        ({ email }: FormValues) => {
            return void dispatch(login.actions.enter({ email }));
        },
        [dispatch],
    );
};

export const LandingScreen: React.FunctionComponent<LandingScreenProps> = () => {
    const { values, handleSubmit, touched, errors, handleChange, handleBlur } = useFormik<FormValues>({
        initialValues: {
            email: Platform.select({
                android: 'a.debens@gmail.co.uk',
                default: 'a.debens@gmail.com',
            }),
        },
        onSubmit: useSubmit(),
        validationSchema,
    });

    const loading = useSelector(login.selectors.loading);

    return (
        <Screen bottom="$layer-01">
            <Grid flex={1} alignItems="center" margin="medium">
                <Grid flex={1} width="100%" justifyContent="center" alignItems="center">
                    <SVG.Bowtie
                        width="100%"
                        height="100%"
                        maxWidth={250}
                        maxHeight={183}
                        preserveAspectRatio="xMidYMid meet"
                    />
                </Grid>
            </Grid>

            <Layer padding="medium">
                <EmailInput
                    label="Email"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    error={touched.email ? errors.email : undefined}
                />
                <Button onPress={handleSubmit} marginTop="small" disabled={loading}>
                    Continue
                </Button>
            </Layer>
        </Screen>
    );
};

const validationSchema = yup.object({
    email: yup.string().required('Please enter your email').email("This doesn't look right"),
});

export default memo(LandingScreen);

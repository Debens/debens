import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    Break,
    Button,
    EmailInput,
    Grid,
    Layer,
    Screen,
    SVG,
} from '@debens/mobile-atoms';
import auth from '@debens/mobile-auth';

import { useFormik } from 'formik';
import * as yup from 'yup';

export type LandingScreenNavigationProps = undefined;

export interface LandingScreenProps {
    onSignUp: () => void;
}

interface FormValues {
    type?: 'register' | 'login';
    email: string;
}

const useSubmit = () => {
    const dispatch = useDispatch();
    return useCallback(
        ({ email, type }: FormValues) => {
            switch (type) {
                case 'login':
                    return void dispatch(auth.actions.login({ email }));
                case 'register':
                    return void dispatch(auth.actions.register({ email }));
                default:
                    return;
            }
        },
        [dispatch],
    );
};

export const LandingScreen: React.FunctionComponent<LandingScreenProps> = () => {
    const { values, handleSubmit, setFieldValue, touched, errors, handleChange, handleBlur } =
        useFormik<FormValues>({
            initialValues: { email: '' },
            onSubmit: useSubmit(),
            validationSchema,
        });

    const onRegister = useCallback(() => {
        setFieldValue('type', 'register');
        handleSubmit();
    }, [setFieldValue, handleSubmit]);

    const onLogin = useCallback(() => {
        setFieldValue('type', 'login');
        handleSubmit();
    }, [setFieldValue, handleSubmit]);

    const loading = useSelector(auth.selectors.loading);

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
                <Break />
                <Button onPress={onRegister} marginBottom="small" disabled={loading}>
                    Sign up
                </Button>
                <Button variant="secondary" onPress={onLogin} disabled={loading}>
                    Login
                </Button>
            </Layer>
        </Screen>
    );
};

const validationSchema = yup.object({
    email: yup.string().required('Please enter your email').email("This doesn't look right"),
});

export default memo(LandingScreen);

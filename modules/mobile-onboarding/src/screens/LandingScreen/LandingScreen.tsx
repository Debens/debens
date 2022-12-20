import React, { memo, useCallback } from 'react';

import http from '@debens/http';
import {
    Break,
    Button,
    EmailInput,
    Grid,
    Layer,
    Screen,
    SVG,
} from '@debens/mobile-atoms';
import { Assertion, Attestation } from '@debens/react-native-fido';
import { AssertionAPI, AttestationAPI } from '@debens/service-identity';

import { useFormik } from 'formik';
import * as yup from 'yup';

export type LandingScreenNavigationProps = undefined;

export interface LandingScreenProps {
    onSignUp: () => void;
}

interface FormValues {
    email: string;
}

const client = http.client.extend([http.modules.domain('https://api.debens.app/identity')]);
const apis = {
    assertion: new AssertionAPI(client),
    attestation: new AttestationAPI(client),
};

export const LandingScreen: React.FunctionComponent<LandingScreenProps> = () => {
    const onRegister = useCallback(() => {
        new Attestation(apis.attestation)
            .register({ email: 'a.debens@gmail.com' })
            .then(console.warn.bind(console))
            .catch(console.error.bind(console));
    }, []);

    const onSubmit = useCallback((values: FormValues) => {
        new Assertion(apis.assertion)
            .login({ email: values.email })
            .then(console.warn.bind(console))
            .catch(console.error.bind(console));
    }, []);

    const { values, handleSubmit, touched, errors, handleChange, handleBlur } = useFormik<FormValues>({
        initialValues: { email: '' },
        onSubmit,
        validationSchema,
    });

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
                <Button onPress={onRegister} marginBottom="small">
                    Sign up
                </Button>
                <Button variant="secondary" onPress={handleSubmit}>
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

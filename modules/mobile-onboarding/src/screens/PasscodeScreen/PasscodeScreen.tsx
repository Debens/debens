import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Break, Button, Grid, Paragraph, Screen, SVG, TextInput, Toolbar } from '@debens/mobile-atoms';
import { WithPasscodeChallenge } from '@debens/service-gateway';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useFormik } from 'formik';
import { DateTime } from 'luxon';
import * as yup from 'yup';

import { OnboardingParamList } from '../../navigation/OnboardingNavigator/OnboardingNavigator';
import { OnboardingRoute } from '../../navigation/routes';
import passcode from '../../passcode';

export type PasscodeScreenNavigationProps = WithPasscodeChallenge;

export type PasscodeScreenProps = NativeStackScreenProps<OnboardingParamList, OnboardingRoute.Passcode>;

interface FormValues {
    code: string;
    challenge: string;
    user: string;
}

const useCountdown = (toDate: DateTime) => {
    const [countdown, setCountdown] = useState(toDate.diff(DateTime.local()));

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown(toDate.diff(DateTime.local()));
        }, 1000);

        return () => clearInterval(interval);
    }, [toDate]);

    return countdown;
};

const CODE_LENGTH = 6;
const useSubmit = () => {
    const dispatch = useDispatch();
    return useCallback(
        (values: FormValues) => {
            console.warn(values);
            return void dispatch(passcode.actions.complete(values));
        },
        [dispatch],
    );
};

export const PasscodeScreen: React.FunctionComponent<PasscodeScreenProps> = ({ navigation, route }) => {
    const { challengedOn, lifetime, id, user } = route.params;
    const { values, handleSubmit, touched, errors, handleChange, handleBlur } = useFormik<FormValues>({
        initialValues: {
            code: '',
            challenge: id,
            user,
        },
        onSubmit: useSubmit(),
        validationSchema,
    });

    const loading = useSelector(passcode.selectors.loading);

    const target = useMemo(() => DateTime.fromISO(challengedOn).plus(lifetime), [challengedOn, lifetime]);
    const countdown = useCountdown(target);

    const isExpired = countdown.valueOf() < 0;

    return (
        <Screen>
            <Toolbar>
                <Toolbar.Item onPress={navigation.goBack}>
                    <SVG.ChevronLeft />
                </Toolbar.Item>
                <Toolbar.Item></Toolbar.Item>
            </Toolbar>
            <Grid flex={1} margin="medium">
                <Grid flexDirection="row" alignItems="center" marginBottom="small">
                    <Grid margin="small">
                        <SVG.MarkunreadMailbox />
                    </Grid>
                    <Grid marginLeft="small">
                        <Paragraph typeset="$heading" marginY="miniscule">
                            You have mail!
                        </Paragraph>
                        <Paragraph color="$text-secondary">
                            We&apos;ve sent your code to some@email.com
                        </Paragraph>
                    </Grid>
                </Grid>
                <Break />
                <TextInput
                    label="Code"
                    onChangeText={handleChange('code')}
                    onBlur={handleBlur('code')}
                    maxLength={CODE_LENGTH}
                    value={values.code}
                    error={touched.code ? errors.code : undefined}
                    onSubmitEditing={handleSubmit}
                />
                <Grid variant="center" flex={1}>
                    <Paragraph typeset="$body" color={isExpired ? '$text-error' : '$text-placeholder'}>
                        {isExpired ? '00:00' : countdown.toFormat('mm:ss')}
                    </Paragraph>
                </Grid>
            </Grid>

            <Grid margin="medium">
                <Button onPress={handleSubmit} marginBottom="small" disabled={loading}>
                    Continue
                </Button>
            </Grid>
        </Screen>
    );
};

const validationSchema = yup.object({
    code: yup.string().required('Please enter the code').length(CODE_LENGTH, "This doesn't look right"),
});

export default memo(PasscodeScreen);

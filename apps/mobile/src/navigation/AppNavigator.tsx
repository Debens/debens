import React, { useCallback } from 'react';

import { useNavigation } from '@react-navigation/core';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Screen } from '@training/mobile-atoms';

import { AppRoute } from '../routes';

import HomeNavigator from './HomeNavigator';

const Onboarding = React.lazy(() => import(/* webpackChunkName: "onboarding" */ './navigators/Onboarding'));

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
    const navigation = useNavigation();
    const onCalendar = useCallback(() => {
        navigation.navigate(AppRoute.Home);
    }, [navigation]);

    return (
        <Stack.Navigator initialRouteName="onboarding">
            <Stack.Group screenOptions={{ headerShown: false }}>
                <Stack.Screen name={AppRoute.Onboarding}>
                    {props => (
                        <React.Suspense fallback={<Screen />}>
                            <Onboarding onDone={onCalendar} {...props} />
                        </React.Suspense>
                    )}
                </Stack.Screen>
                <Stack.Screen name={AppRoute.Home} component={HomeNavigator} />
            </Stack.Group>
        </Stack.Navigator>
    );
};

export default AppNavigator;

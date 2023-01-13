import React, { useCallback } from 'react';

import { Screen } from '@debens/mobile-atoms';
import { useNavigation } from '@react-navigation/core';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import { AppRoute } from '../routes';

const Onboarding = React.lazy(() => import(/* webpackChunkName: "onboarding" */ './navigators/Onboarding'));

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
    const navigation = useNavigation();
    const onOnboardingComplete = useCallback(() => {
        navigation.navigate(AppRoute.Home);
    }, [navigation]);

    return (
        <Stack.Navigator initialRouteName="home">
            <Stack.Group screenOptions={{ headerShown: false }}>
                <Stack.Screen name={AppRoute.Onboarding}>
                    {props => (
                        <React.Suspense fallback={<Screen />}>
                            <Onboarding onDone={onOnboardingComplete} {...props} />
                        </React.Suspense>
                    )}
                </Stack.Screen>
                <Stack.Screen name={AppRoute.Home} component={HomeScreen} />
            </Stack.Group>
        </Stack.Navigator>
    );
};

export default AppNavigator;

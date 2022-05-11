import React, { memo } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LandingScreen, { LandingScreenNavigationProps } from '../../screens/LandingScreen/LandingScreen';
import { OnboardingRoute } from '../routes';

const Stack = createNativeStackNavigator();

export interface OnboardingParamList {
    [OnboardingRoute.Landing]: LandingScreenNavigationProps;
}

/* eslint-disable @typescript-eslint/no-namespace, @typescript-eslint/no-empty-interface */
declare global {
    namespace ReactNavigation {
        interface RootParamList extends OnboardingParamList {}
    }
}
/* eslint-enable @typescript-eslint/no-namespace, @typescript-eslint/no-empty-interface */

export const OnboardingNavigator = () => (
    <Stack.Navigator initialRouteName={OnboardingRoute.Landing}>
        <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name={OnboardingRoute.Landing} component={LandingScreen} />
        </Stack.Group>
    </Stack.Navigator>
);

export default memo(OnboardingNavigator);

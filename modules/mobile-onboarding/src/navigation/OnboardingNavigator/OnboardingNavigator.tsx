import React, { memo } from 'react';

import { DynamicModuleLoader } from 'redux-dynamic-modules';

import auth from '@debens/mobile-auth';
import navigation from '@debens/mobile-navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { module } from '../../module';
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

interface OnboardingNavigatorProps {
    onDone: () => void;
}

export const OnboardingNavigator: React.FunctionComponent<OnboardingNavigatorProps> = props => (
    <DynamicModuleLoader modules={[module, auth.module, navigation.module]}>
        <Stack.Navigator initialRouteName={OnboardingRoute.Landing}>
            <Stack.Group screenOptions={{ headerShown: false }}>
                <Stack.Screen name={OnboardingRoute.Landing}>
                    {() => <LandingScreen onSignUp={props.onDone} />}
                </Stack.Screen>
            </Stack.Group>
        </Stack.Navigator>
    </DynamicModuleLoader>
);

export default memo(OnboardingNavigator);

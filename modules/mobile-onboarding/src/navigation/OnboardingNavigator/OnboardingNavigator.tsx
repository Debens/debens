import React from 'react';

import auth from '@debens/mobile-auth';
import navigation from '@debens/mobile-navigation';
import { withModules } from '@debens/toolkit-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { module } from '../../module';
import LandingScreen, { LandingScreenNavigationProps } from '../../screens/LandingScreen/LandingScreen';
import { PasscodeScreen, PasscodeScreenNavigationProps } from '../../screens/PasscodeScreen/PasscodeScreen';
import { OnboardingRoute } from '../routes';

const Stack = createNativeStackNavigator<ReactNavigation.RootParamList>();

export type OnboardingParamList = {
    [OnboardingRoute.Landing]: LandingScreenNavigationProps;
    [OnboardingRoute.Passcode]: PasscodeScreenNavigationProps;
};

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
    <Stack.Navigator initialRouteName={OnboardingRoute.Landing}>
        <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name={OnboardingRoute.Landing}>
                {() => <LandingScreen onSignUp={props.onDone} />}
            </Stack.Screen>
            <Stack.Screen name={OnboardingRoute.Passcode} component={PasscodeScreen} />
        </Stack.Group>
    </Stack.Navigator>
);

export default withModules([module, auth.module, navigation.module])(OnboardingNavigator);

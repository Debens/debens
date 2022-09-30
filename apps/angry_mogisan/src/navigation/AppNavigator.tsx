import React, { memo } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GameScreen from '../screens/GameScreen';
import LandingScreen from '../screens/LandingScreen';

import { AppRoute } from './routes';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="onboarding">
            <Stack.Group screenOptions={{ headerShown: false }}>
                <Stack.Screen name={AppRoute.Landing} component={LandingScreen} />
                <Stack.Screen name={AppRoute.Game} component={GameScreen} />
            </Stack.Group>
        </Stack.Navigator>
    );
};

export default memo(AppNavigator);

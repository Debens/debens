import React, { memo } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FacebookScreen from '../screens/FacebookScreen';
import GameScreen from '../screens/GameScreen';
import LandingScreen from '../screens/LandingScreen';
import SettingsScreen from '../screens/SettingsScreen';

import { AppRoute } from './routes';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={AppRoute.Game}>
            <Stack.Group screenOptions={{ headerShown: false }}>
                <Stack.Screen name={AppRoute.Landing} component={LandingScreen} />
                <Stack.Screen name={AppRoute.Game} component={GameScreen} />
                <Stack.Screen name={AppRoute.Settings} component={SettingsScreen} />
                <Stack.Screen name={AppRoute.Facebook} component={FacebookScreen} />
            </Stack.Group>
        </Stack.Navigator>
    );
};

export default memo(AppNavigator);

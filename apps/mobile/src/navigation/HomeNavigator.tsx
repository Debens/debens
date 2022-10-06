import React from 'react';

import { Screen } from '@debens/mobile-atoms';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeRoute } from '../routes';

const Calendar = React.lazy(() => import(/* webpackChunkName: "calendar" */ './navigators/Calendar'));

const Stack = createNativeStackNavigator();

export const HomeNavigator = () => (
    <Stack.Navigator initialRouteName={HomeRoute.Calendar}>
        <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name={HomeRoute.Calendar}>
                {() => (
                    <React.Suspense fallback={<Screen />}>
                        <Calendar />
                    </React.Suspense>
                )}
            </Stack.Screen>
        </Stack.Group>
    </Stack.Navigator>
);

export default HomeNavigator;

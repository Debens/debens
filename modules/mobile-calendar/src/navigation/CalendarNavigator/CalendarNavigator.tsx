import React, { memo } from 'react';

import { GraphQLProvider } from '@debens/graphql';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CalendarScreen, { CalendarScreenNavigationProps } from '../../screens/CalendarScreen/CalendarScreen';
import { CalendarRoute } from '../routes';

const Stack = createNativeStackNavigator();

export interface CalendarParamList {
    [CalendarRoute.Landing]: CalendarScreenNavigationProps;
}

/* eslint-disable @typescript-eslint/no-namespace, @typescript-eslint/no-empty-interface */
declare global {
    namespace ReactNavigation {
        interface RootParamList extends CalendarParamList {}
    }
}
/* eslint-enable @typescript-eslint/no-namespace, @typescript-eslint/no-empty-interface */

export const CalendarNavigator = () => (
    <GraphQLProvider>
        <Stack.Navigator initialRouteName={CalendarRoute.Landing}>
            <Stack.Group screenOptions={{ headerShown: false }}>
                <Stack.Screen name={CalendarRoute.Landing} component={CalendarScreen} />
            </Stack.Group>
        </Stack.Navigator>
    </GraphQLProvider>
);

export default memo(CalendarNavigator);

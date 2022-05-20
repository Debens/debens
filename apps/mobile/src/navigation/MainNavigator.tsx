import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { Screen } from '@training/mobile-atoms';

const Onboarding = React.lazy(() => import(/* webpackChunkName: "onboarding" */ './navigators/Onboarding'));

export const MainNavigator = () => (
    <NavigationContainer>
        <React.Suspense fallback={<Screen />}>
            <Onboarding />
        </React.Suspense>
    </NavigationContainer>
);

export default MainNavigator;

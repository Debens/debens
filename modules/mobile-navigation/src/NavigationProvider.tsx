import React from 'react';

import {
    createNavigationContainerRef,
    NavigationContainer,
} from '@react-navigation/native';

export const navigation = createNavigationContainerRef();

export const NavigationProvider = ({ children }: React.PropsWithChildren) => (
    <NavigationContainer ref={navigation}>{children}</NavigationContainer>
);

import React, { useCallback } from 'react';

import { Federated } from '@callstack/repack/client';
import { Paragraph, Screen } from '@debens/mobile-atoms';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppRoute } from '../routes';
import HomeScreen from '../screens/HomeScreen/HomeScreen';

const Onboarding = React.lazy(() => import(/* webpackChunkName: "onboarding" */ './navigators/Onboarding'));

const AngryMogisan = React.lazy(() => Federated.importModule('AngryMogisan', './App'));

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
    const navigation = useNavigation();
    const onOnboardingComplete = useCallback(() => {
        navigation.navigate(AppRoute.Home);
    }, [navigation]);

    type ErrorBoundaryProps = React.PropsWithChildren<{}>;
    type ErrorBoundaryState = { hasError: boolean };

    class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
        constructor(props: ErrorBoundaryProps) {
            super(props);

            this.state = { hasError: false };
        }

        static getDerivedStateFromError() {
            return { hasError: true };
        }

        render() {
            return this.state.hasError ? (
                <Screen justifyContent="center" alignItems="center">
                    <Paragraph>failed</Paragraph>
                </Screen>
            ) : (
                this.props.children
            );
        }
    }

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
                <Stack.Screen name={AppRoute.AngryMogisan}>
                    {() => (
                        <ErrorBoundary>
                            <React.Suspense
                                fallback={
                                    <Screen justifyContent="center" alignItems="center">
                                        <Paragraph>loading</Paragraph>
                                    </Screen>
                                }>
                                <AngryMogisan />
                            </React.Suspense>
                        </ErrorBoundary>
                    )}
                </Stack.Screen>
            </Stack.Group>
        </Stack.Navigator>
    );
};

export default AppNavigator;

import React, { memo, useCallback } from 'react';

import http from '@training/http';
import { Button, Grid, Layer, Screen, SVG } from '@training/mobile-atoms';
import { Assertion, Attestation } from '@training/react-native-fido';
import { AssertionService, AttestationService } from '@training/service-identity';

export type LandingScreenNavigationProps = undefined;

export interface LandingScreenProps {
    onSignUp: () => void;
}

const client = http.client.extend([http.modules.domain('https://435a-89-44-41-28.eu.ngrok.io')]);
const services = {
    assertion: new AssertionService(client),
    attestation: new AttestationService(client),
};

export const LandingScreen: React.FunctionComponent<LandingScreenProps> = () => {
    const onRegister = useCallback(() => {
        new Attestation(services.attestation)
            .register({ name: 'Training App' })
            .then(console.warn.bind(console))
            .catch(console.error.bind(console));
    }, []);
    const onLogin = useCallback(() => {
        new Assertion(services.assertion)
            .login()
            .then(console.warn.bind(console))
            .catch(console.error.bind(console));
    }, []);

    return (
        <Screen bottom="$layer-01">
            <Grid flex={1} alignItems="center" margin="medium">
                <Grid flex={1} width="100%" justifyContent="center" alignItems="center">
                    <SVG.Bowtie
                        width="100%"
                        height="100%"
                        maxWidth={250}
                        maxHeight={183}
                        preserveAspectRatio="xMidYMid meet"
                    />
                </Grid>
            </Grid>

            <Layer padding="medium">
                <Button marginBottom="small" onPress={onLogin}>
                    Login
                </Button>
                <Button variant="secondary" onPress={onRegister}>
                    Sign up
                </Button>
            </Layer>
        </Screen>
    );
};

export default memo(LandingScreen);

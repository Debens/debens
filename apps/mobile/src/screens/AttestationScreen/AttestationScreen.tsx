import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { gql, useMutation, useQuery } from '@debens/graphql';
import { Button, Grid, Paragraph, Screen, SVG, Toolbar } from '@debens/mobile-atoms';
import snackbar from '@debens/mobile-messaging/src/snackbar';
import { module as fido } from '@debens/react-native-fido';
import { useNavigation } from '@react-navigation/native';

export type AttestationScreenNavigationProps = undefined;

const SUCCESS = snackbar.actions.show({ type: 'success', message: 'Passkey created' });
const ERROR = snackbar.actions.show({ type: 'success', message: 'Passkey creation failed' });

export const AttestationScreen: React.FunctionComponent = () => {
    const { data, loading, error } = useQuery(ATTESTATION_QUERY, { fetchPolicy: 'network-only' });
    const [onExecute] = useMutation(PASSKEY_MUTATION);

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { challenge } = data?.viewer.credentials.passkeys ?? {};
    const onCreate = useCallback(async () => {
        if (challenge) {
            try {
                await fido
                    .attestation(challenge)
                    .then(credentials => onExecute({ variables: { credentials } }))
                    .then(() => dispatch(SUCCESS))
                    .then(() => navigation.goBack);
            } catch (_) {
                dispatch(ERROR);
            }
        }
    }, [challenge, dispatch, navigation, onExecute]);

    return (
        <Screen>
            <Toolbar>
                <Toolbar.Item onPress={navigation.goBack}>
                    <SVG.Close />
                </Toolbar.Item>
            </Toolbar>
            <Grid flex={1} alignItems="center" margin="medium" marginTop="xlarge">
                <SVG.Fingerprint size="xlarge" />
                <Paragraph typeset="$heading" textAlign="center" margin="small">
                    Create Passkey
                </Paragraph>
                <Paragraph textAlign="center" color="$text-secondary">
                    Don&apos;t want to login using email passcode?
                </Paragraph>
                <Paragraph textAlign="center" margin="medium">
                    Passkeys use on device encyription techonology to ensure account security with no
                    requirement for passwords.
                </Paragraph>
            </Grid>
            <Grid justifyContent="flex-end" margin="medium">
                <Button onPress={onCreate} disabled={loading || !!error}>
                    Create Passkey
                </Button>
            </Grid>
        </Screen>
    );
};

const PASSKEY_MUTATION = gql`
    mutation CreatePasskey($credentials: PublicKeyCredential!) {
        passkey(credentials: $credentials) {
            success
        }
    }
`;

const ATTESTATION_QUERY = gql`
    query AttestationScreen {
        viewer {
            credentials {
                passkeys {
                    challenge {
                        publicKey {
                            rp {
                                id
                                name
                            }
                            user {
                                id
                                name
                                displayName
                            }
                            challenge
                            pubKeyCredParams {
                                type
                                alg
                            }
                            timeout
                            authenticatorSelection {
                                authenticatorAttachment
                                requireResidentKey
                                residentKey
                                userVerification
                            }
                            attestation
                        }
                    }
                }
            }
        }
    }
`;

export default memo(AttestationScreen);

import React, { memo, useCallback } from 'react';

import { gql, useQuery } from '@debens/graphql';
import { Break, Ghost, Grid, Loader, Paragraph, Screen, SVG, SVGType, Toolbar } from '@debens/mobile-atoms';
import { AuxButton } from '@debens/mobile-molecules';
import { PanelList } from '@debens/mobile-organisms';
import { useNavigation } from '@react-navigation/native';

import { AppRoute } from '../../routes';

export type ProfileScreenNavigationProps = undefined;

const SCREEN_QUERY = gql`
    query ProfileScreen {
        viewer {
            id
            names {
                display
            }
            email {
                id
                address
            }
            credentials {
                passkeys {
                    registered {
                        id
                    }
                }
            }
        }
    }
`;

export const ProfileScreen: React.FunctionComponent = () => {
    const { data, loading, error } = useQuery(SCREEN_QUERY);

    const navigation = useNavigation();
    const onCreatePasskey = useCallback(() => {
        navigation.navigate(AppRoute.Attestation);
    }, [navigation]);

    return (
        <Screen>
            <Toolbar>
                <Toolbar.Item onPress={navigation.goBack}>
                    <SVG.ChevronLeft />
                </Toolbar.Item>
            </Toolbar>
            <Paragraph typeset="$heading" textAlign="center">
                {data?.viewer.names.display}
            </Paragraph>
            <Loader alignItems="center" loading={loading} marginY="small">
                <Loader.Loading>
                    <Ghost.Text typeset="$body" chars={32} />
                </Loader.Loading>
                <Paragraph typeset="$body" color="$text-placeholder">
                    {data?.viewer?.id ?? ' '}
                </Paragraph>
            </Loader>
            <Grid flexDirection="row">
                <Break flex={1} />
                <SVG.Person />
                <Break flex={1} />
            </Grid>
            <Grid flex={1} margin="medium">
                <PanelList<{ address: string }>
                    mb="medium"
                    data={data?.viewer?.email}
                    renderItem={({ item }) => <Paragraph>{item.address}</Paragraph>}>
                    <Paragraph fontWeight="bold">Emails</Paragraph>
                    <AuxButton image={SVGType.Add} marginLeft="auto">
                        New
                    </AuxButton>
                </PanelList>
                <PanelList<{ id: string }>
                    data={data?.viewer?.credentials.passkeys.registered}
                    renderItem={({ item }) => <Paragraph>{item.id}</Paragraph>}>
                    <Paragraph fontWeight="bold">Passkeys</Paragraph>
                    <AuxButton image={SVGType.Add} onPress={onCreatePasskey} marginLeft="auto">
                        New
                    </AuxButton>
                </PanelList>
            </Grid>
        </Screen>
    );
};

export default memo(ProfileScreen);

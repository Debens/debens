import React, { memo } from 'react';

import { gql, useQuery } from '@debens/graphql';
import { Break, Button, Ghost, Grid, Loader, Paragraph, Screen, SVG, Toolbar } from '@debens/mobile-atoms';
import { useNavigation } from '@react-navigation/native';

export type ProfileScreenNavigationProps = undefined;

const SCREEN_QUERY = gql`
    query ProfileScreen {
        viewer {
            id
        }
    }
`;

export const ProfileScreen: React.FunctionComponent = () => {
    const { data, loading, error } = useQuery(SCREEN_QUERY);

    const navigation = useNavigation();

    return (
        <Screen>
            <Toolbar>
                <Toolbar.Item onPress={navigation.goBack}>
                    <SVG.ChevronLeft />
                </Toolbar.Item>
            </Toolbar>
            <Paragraph typeset="$heading" textAlign="center">
                Andrew Debens
            </Paragraph>
            <Loader alignItems="center" loading={loading} marginBottom="small">
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
                <Grid backgroundColor="$layer-01" borderRadius="medium" p="medium" mb="medium">
                    <Paragraph fontWeight="bold" marginBottom="small">
                        Emails
                    </Paragraph>
                    <Loader alignItems="center" loading={loading} marginY="small">
                        <Loader.Loading>
                            <Ghost.Text typeset="$body" chars={32} />
                        </Loader.Loading>
                        <Paragraph typeset="$body" color="$text-placeholder">
                            No email
                        </Paragraph>
                    </Loader>
                    <Button.Frame
                        flexDirection="row"
                        alignItems="center"
                        activeColor="$layer-active-01"
                        padding="small"
                        borderRadius="xlarge"
                        onPress={() => void 0}
                        alignSelf="flex-end">
                        <SVG.Add preserveAspectRatio="xMidyMid meet" size="medium" />
                        <Paragraph marginLeft="xsmall">Add</Paragraph>
                    </Button.Frame>
                </Grid>
                <Grid backgroundColor="$layer-01" borderRadius="medium" p="medium">
                    <Paragraph fontWeight="bold" marginBottom="small">
                        Passkeys
                    </Paragraph>
                    <Loader alignItems="center" loading={loading} marginY="small">
                        <Loader.Loading>
                            <Ghost.Text typeset="$body" chars={32} />
                        </Loader.Loading>
                        <Paragraph typeset="$body" color="$text-placeholder">
                            No passkeys
                        </Paragraph>
                    </Loader>
                    <Button.Frame
                        flexDirection="row"
                        alignItems="center"
                        activeColor="$layer-active-01"
                        padding="small"
                        borderRadius="xlarge"
                        onPress={() => void 0}
                        alignSelf="flex-end">
                        <SVG.Add preserveAspectRatio="xMidyMid meet" size="medium" />
                        <Paragraph marginLeft="xsmall">Create</Paragraph>
                    </Button.Frame>
                </Grid>
            </Grid>
        </Screen>
    );
};

export default memo(ProfileScreen);

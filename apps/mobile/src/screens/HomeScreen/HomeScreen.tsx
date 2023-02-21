import React, { memo, useCallback } from 'react';

import { gql, useQuery } from '@debens/graphql';
import { Grid, Paragraph, Screen, SVG, SVGType, Toolbar } from '@debens/mobile-atoms';
import { NavigationRow } from '@debens/mobile-molecules';
import { useNavigation } from '@react-navigation/native';

import { AppRoute } from '../../routes';

export type HomeScreenNavigationProps = undefined;

const SCREEN_QUERY = gql`
    query ProfileScreen {
        viewer {
            names {
                display
            }
        }
    }
`;

export const HomeScreen: React.FunctionComponent = () => {
    const { data } = useQuery(SCREEN_QUERY);

    const navigation = useNavigation();
    const onAngryMogisan = useCallback(() => {
        navigation.navigate(AppRoute.AngryMogisan);
    }, [navigation]);
    const onProfile = useCallback(() => {
        navigation.navigate(AppRoute.Profile);
    }, [navigation]);

    return (
        <Screen>
            <Toolbar>
                <Toolbar.Item>
                    <SVG.Person onPress={onProfile} />
                </Toolbar.Item>
            </Toolbar>
            <Grid flex={1} margin="medium">
                <Grid flex={1}>
                    <Paragraph typeset="$heading">Hi, {data?.viewer.names.display}.</Paragraph>
                </Grid>
                <NavigationRow heading="Quote Book" image={SVGType.Quote}>
                    <Paragraph fontStyle="italic" typeset="$body" color="$text-placeholder" numberOfLines={1}>
                        You: &quot;I live life on my terms, not TFLs&quot;
                    </Paragraph>
                </NavigationRow>
                <NavigationRow
                    heading="Angry Mogisán"
                    image={SVGType.Face}
                    marginTop="small"
                    onPress={onAngryMogisan}>
                    <Paragraph fontStyle="italic" typeset="$body" color="$text-placeholder" numberOfLines={1}>
                        15 faces
                    </Paragraph>
                </NavigationRow>
            </Grid>
        </Screen>
    );
};

export default memo(HomeScreen);

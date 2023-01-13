import React, { memo } from 'react';

import { gql, useQuery } from '@debens/graphql';
import {
    Ghost,
    Grid,
    Loader,
    Paragraph,
    Screen,
    SVG,
    SVGType,
    Toolbar,
} from '@debens/mobile-atoms';
import { NavigationRow } from '@debens/mobile-molecules';

export type HomeScreenNavigationProps = undefined;

const SCREEN_QUERY = gql`
    query HomeScreen {
        viewer {
            id
        }
    }
`;

export const HomeScreen: React.FunctionComponent = () => {
    const { data, loading, error } = useQuery(SCREEN_QUERY);

    return (
        <Screen>
            <Toolbar>
                <Toolbar.Item>
                    <SVG.Person />
                </Toolbar.Item>
            </Toolbar>
            <Grid flex={1} justifyContent="flex-end" margin="medium">
                <Loader alignItems="center" loading={loading} margin="medium">
                    <Loader.Loading>
                        <Ghost.Text typeset="$body" chars={32} />
                    </Loader.Loading>
                    {error ? (
                        <Paragraph typeset="$body">error: {error?.message}</Paragraph>
                    ) : (
                        <Paragraph typeset="$body">data: {data?.viewer?.id}</Paragraph>
                    )}
                </Loader>
                <NavigationRow heading="Quote Book" image={SVGType.Quote}>
                    <Paragraph fontStyle="italic" typeset="$body" color="$text-placeholder" numberOfLines={1}>
                        You: &quot;I live life on my terms, not TFLs&quot;
                    </Paragraph>
                </NavigationRow>
                <NavigationRow heading="Angry Mogisán" image={SVGType.Face} marginTop="small">
                    <Paragraph fontStyle="italic" typeset="$body" color="$text-placeholder" numberOfLines={1}>
                        12 faces
                    </Paragraph>
                </NavigationRow>
            </Grid>
        </Screen>
    );
};

export default memo(HomeScreen);

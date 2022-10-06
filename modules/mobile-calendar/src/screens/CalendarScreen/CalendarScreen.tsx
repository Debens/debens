import React, { memo } from 'react';

import { gql, useQuery } from '@debens/graphql';
import { Ghost, Grid, Loader, Paragraph, Screen } from '@debens/mobile-atoms';

export type CalendarScreenNavigationProps = undefined;

const CALENDAR_SCREEN_QUERY = gql`
    query CalenderScreen {
        viewer {
            id
        }
    }
`;

export const CalendarScreen: React.FunctionComponent = () => {
    const { data, loading, error } = useQuery(CALENDAR_SCREEN_QUERY);

    return (
        <Screen>
            <Grid flex={1} margin="medium">
                <Loader flex={1} justifyContent="center" alignItems="center" loading={loading}>
                    <Loader.Loading>
                        <Ghost.Text typeset="$body" chars={32} />
                    </Loader.Loading>
                    {error ? (
                        <Paragraph typeset="$body">error: {error?.message}</Paragraph>
                    ) : (
                        <Paragraph typeset="$body">data: {data?.viewer?.id}</Paragraph>
                    )}
                </Loader>
            </Grid>
        </Screen>
    );
};

export default memo(CalendarScreen);

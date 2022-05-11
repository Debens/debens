import React, { memo } from 'react';

import { Button, Grid, Layer, Paragraph, Screen } from '@training/mobile-atoms';

export type LandingScreenNavigationProps = never;

export const LandingScreen: React.FunctionComponent = () => (
    <Screen bottom="$layer-01">
        <Grid flex={1} justifyContent="center" alignItems="center">
            <Paragraph>Welcome.</Paragraph>
        </Grid>

        <Layer padding="large">
            <Button marginBottom="small">Login</Button>
            <Button variant="secondary">Sign up</Button>
        </Layer>
    </Screen>
);

export default memo(LandingScreen);

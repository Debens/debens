import React, { memo, useCallback, useState } from 'react';

import { Button, Ghost, Grid, Layer, Loader, Paragraph, Screen, SVG } from '@training/mobile-atoms';

export type LandingScreenNavigationProps = never;

export const LandingScreen: React.FunctionComponent = () => {
    const [loading, setLoading] = useState(true);
    const onPress = useCallback(() => {
        setLoading(loading => !loading);
    }, []);

    return (
        <Screen bottom="$layer-01">
            <Grid flex={1} justifyContent="center" alignItems="center" marginX="xlarge">
                <SVG.Bowtie width="100%" maxWidth={250} height={183} preserveAspectRatio="xMidYMid meet" />
                <Loader loading={loading}>
                    <Loader.Loading>
                        <Ghost margin="medium" height={17} width={100} />
                    </Loader.Loading>
                    <Paragraph margin="medium">Welcome.</Paragraph>
                </Loader>
            </Grid>

            <Layer padding="medium">
                <Button marginBottom="small" onPress={onPress}>
                    Login
                </Button>
                <Button variant="secondary">Sign up</Button>
            </Layer>
        </Screen>
    );
};

export default memo(LandingScreen);

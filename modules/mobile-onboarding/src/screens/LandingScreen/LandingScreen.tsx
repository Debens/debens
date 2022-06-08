import React, { memo, useCallback, useState } from 'react';

import { Button, Ghost, Grid, Layer, Loader, Paragraph, Screen, SVG } from '@training/mobile-atoms';

export type LandingScreenNavigationProps = undefined;

export interface LandingScreenProps {
    onSignUp: () => void;
}

export const LandingScreen: React.FunctionComponent<LandingScreenProps> = props => {
    const [loading, setLoading] = useState(true);
    const onPress = useCallback(() => {
        setLoading(loading => !loading);
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
                <Loader margin="small" marginTop="auto" loading={loading}>
                    <Loader.Loading>
                        <Ghost.Text typeset="$body" chars={7} />
                    </Loader.Loading>
                    <Paragraph typeset="$body">Welcome</Paragraph>
                </Loader>
            </Grid>

            <Layer padding="medium">
                <Button marginBottom="small" onPress={onPress}>
                    Login
                </Button>
                <Button variant="secondary" onPress={props.onSignUp}>
                    Sign up
                </Button>
            </Layer>
        </Screen>
    );
};

export default memo(LandingScreen);

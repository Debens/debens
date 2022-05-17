import React, { memo, useCallback, useState } from 'react';

import { Button, Ghost, Layer, Loader, Paragraph, Screen } from '@training/mobile-atoms';

export type LandingScreenNavigationProps = never;

export const LandingScreen: React.FunctionComponent = () => {
    const [loading, setLoading] = useState(true);
    const onPress = useCallback(() => {
        setLoading(loading => !loading);
    }, []);

    return (
        <Screen bottom="$layer-01">
            <Loader flex={1} justifyContent="center" alignItems="center" loading={loading}>
                <Loader.Loading>
                    <Ghost margin="medium" height={20} width={100} />
                </Loader.Loading>
                <Paragraph margin="medium">Welcome.</Paragraph>
            </Loader>

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

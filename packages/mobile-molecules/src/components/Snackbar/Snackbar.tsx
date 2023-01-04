import React, { memo } from 'react';
import { FadeOutUp, Layout, SlideInDown } from 'react-native-reanimated';

import {
    Button,
    ENTERING,
    EXITING,
    Grid,
    Paragraph,
    standard,
} from '@debens/mobile-atoms';

export type SnackbarProps = React.ComponentProps<typeof Grid.Animated> & {
    message: string;
    onPress?: () => void;
};

const Snackbar: React.FunctionComponent<SnackbarProps> = props => {
    const { message, onPress, ...animation } = props;
    return (
        <Grid.Animated {...animation}>
            <Button.Frame onPress={onPress}>
                <Grid backgroundColor="$button-danger" borderRadius="large" padding="medium">
                    <Paragraph color="$text-on-color">{message}</Paragraph>
                </Grid>
            </Button.Frame>
        </Grid.Animated>
    );
};

const easing = standard.factory();
Snackbar.defaultProps = {
    exiting: FadeOutUp.duration(EXITING).easing(easing),
    entering: SlideInDown.duration(ENTERING).easing(easing).springify().damping(20).stiffness(130),
    layout: Layout.springify(),
};

export default memo(Snackbar);

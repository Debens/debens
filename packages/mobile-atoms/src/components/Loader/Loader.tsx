import React from 'react';
import { FadeInDown, FadeOut } from 'react-native-reanimated';

import { not } from '@debens/utils';

import { standard } from '../../utils/easing';
import { isElementName } from '../../utils/is-element';
import { ENTERING, EXITING } from '../../utils/speeds';
import Grid from '../Grid/Grid';

export type LoaderProps = React.ComponentProps<typeof Grid.Animated> &
    React.PropsWithChildren<{
        loading?: boolean;
    }>;

interface LoadingType extends React.FunctionComponent<LoaderProps> {
    Loading: React.FunctionComponent<LoadingProps>;
}

export const Loader: LoadingType = props => {
    const children = React.Children.toArray(props.children);

    const content = props.loading
        ? children.filter(isElementName('Loading'))
        : children.filter(not(isElementName('Loading')));

    return (
        <Grid.Animated key={`${props.loading}`} {...props}>
            {content}
        </Grid.Animated>
    );
};

const easing = standard.factory();
Loader.defaultProps = {
    exiting: FadeOut.duration(EXITING).easing(easing),
    entering: FadeInDown.duration(ENTERING).easing(easing).springify().damping(16).stiffness(130),
};

type LoadingProps = { children: React.ReactNode };
const Loading: React.FunctionComponent<LoadingProps> = props => <>{props.children}</>;
Loader.Loading = Loading;

export default Loader;

import React from 'react';
import { FadeInDown, FadeOut } from 'react-native-reanimated';

import { not } from '@debens/utils';

import { standard } from '../../utils/easing';
import { isElement } from '../../utils/is-element';
import { ENTERING, EXITING } from '../../utils/speeds';
import Grid from '../Grid/Grid';

type Children<P> = React.ReactNode | React.JSXElementConstructor<{ data: NonNullable<P> }>;
export type LoaderProps<D> = React.ComponentProps<typeof Grid.Animated> & {
    loading?: boolean;
    data?: D;
    children?: [React.ReactNode, Children<D>] | Children<D>;
};

const toArray = <D,>(children?: [React.ReactNode, Children<D>] | Children<D>): Array<Children<D>> =>
    Array.isArray(children) ? children : [children];

const isReady = <D, P extends { data?: D }>(props: P): props is P & { data: NonNullable<D> } =>
    Object.keys(props).includes('data') ? !!props.data : true;

export const Loader = <D,>(props: LoaderProps<D>) => {
    const children = toArray(props.children);

    const rendered = isReady(props) && !props.loading;
    const content = rendered
        ? children
              .filter(not(isElement(Loading)))
              .map((Element, index) =>
                  typeof Element === 'function' ? <Element key={index} data={props.data} /> : Element,
              )
        : children.filter(isElement(Loading));

    return (
        <Grid.Animated key={`${rendered}`} {...props}>
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

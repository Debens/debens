import React from 'react';
import { SvgProps, SvgXml, XmlProps } from 'react-native-svg';

import Bowtie from '../../assets/svg/bowtie.svg';
import ChevronLeft from '../../assets/svg/chevron-left.svg';
import Refresh from '../../assets/svg/refresh.svg';
import Settings from '../../assets/svg/settings.svg';

export enum SVGType {
    Bowtie = 'Bowtie',
    ChevronLeft = 'ChevronLeft',
    Refresh = 'Refresh',
    Settings = 'Settings',
}

interface SVGProps extends SvgProps {
    maxWidth?: number;
    maxHeight?: number;
}

type SVGComponent = React.ComponentType<SVGProps>;
export const mapping: Record<SVGType, SVGComponent> = {
    [SVGType.Bowtie]: Bowtie,
    [SVGType.ChevronLeft]: ChevronLeft,
    [SVGType.Refresh]: Refresh,
    [SVGType.Settings]: Settings,
};

export type SVG = React.FunctionComponent<XmlProps> & {
    [type in SVGType]: SVGComponent;
};

const createSVG = (): SVG => {
    const Component: React.FunctionComponent<XmlProps> = props => <SvgXml {...props} />;
    return Object.entries(mapping).reduce<SVG>(
        (Component, [key, variant]) => Object.assign(Component, { [key]: variant }),
        Component as SVG,
    );
};

const SVG = createSVG();

export default SVG;

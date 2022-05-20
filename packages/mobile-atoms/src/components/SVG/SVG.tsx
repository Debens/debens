import React from 'react';
import { SvgProps, SvgXml, XmlProps } from 'react-native-svg';

import Bowtie from '../../assets/svg/bowtie.svg';

export enum SVGType {
    Bowtie = 'Bowtie',
}

interface SVGProps extends SvgProps {
    maxWidth?: number;
    maxHeight?: number;
}
type SVGComponent = React.ComponentType<SVGProps>;
export const mapping: Record<SVGType, SVGComponent> = {
    [SVGType.Bowtie]: Bowtie,
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

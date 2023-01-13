import React from 'react';
import { SvgProps, SvgXml, XmlProps } from 'react-native-svg';

/* https://www.figma.com/file/DP8uirpdUNP5Y2JK0MSueG/Material-Design-Icons-Pack-(Community)?node-id=0%3A1&t=dGSexT77uC5VSV8g-0 */
import Bowtie from '../../assets/svg/bowtie.svg';
import ChevronLeft from '../../assets/svg/chevron-left.svg';
import Face from '../../assets/svg/face.svg';
import Person from '../../assets/svg/person.svg';
import Quote from '../../assets/svg/quote.svg';
import RadioSelected from '../../assets/svg/radio-selected.svg';
import RadioUnselected from '../../assets/svg/radio-unselected.svg';
import Refresh from '../../assets/svg/refresh.svg';
import Settings from '../../assets/svg/settings.svg';

export enum SVGType {
    Bowtie = 'Bowtie',
    ChevronLeft = 'ChevronLeft',
    Refresh = 'Refresh',
    Settings = 'Settings',
    Person = 'Person',
    RadioSelected = 'RadioSelected',
    RadioUnselected = 'RadioUnselected',
    Quote = 'Quote',
    Face = 'Face',
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
    [SVGType.Person]: Person,
    [SVGType.RadioSelected]: RadioSelected,
    [SVGType.RadioUnselected]: RadioUnselected,
    [SVGType.Quote]: Quote,
    [SVGType.Face]: Face,
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

type DynamicProps = SVGProps & {
    image: SVGType;
};

const Dynamic: React.FunctionComponent<DynamicProps> = props => {
    const { image, ...svg } = props;
    const Image = SVG[image];
    return <Image {...svg} />;
};

const SVG = Object.assign(createSVG(), { Dynamic });

export default SVG;

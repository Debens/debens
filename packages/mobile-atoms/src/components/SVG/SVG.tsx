import React, { useMemo } from 'react';
import { SvgProps, SvgXml, XmlProps } from 'react-native-svg';

import { ColorToken, SpacingToken } from '@debens/theme';

import Add from '../../assets/svg/add.svg';
/* https://www.figma.com/file/DP8uirpdUNP5Y2JK0MSueG/Material-Design-Icons-Pack-(Community)?node-id=0%3A1&t=dGSexT77uC5VSV8g-0 */
import Bowtie from '../../assets/svg/bowtie.svg';
import ChevronLeft from '../../assets/svg/chevron-left.svg';
import Close from '../../assets/svg/close.svg';
import Face from '../../assets/svg/face.svg';
import Fingerprint from '../../assets/svg/fingerprint.svg';
import MarkunreadMailbox from '../../assets/svg/markunread-mailbox.svg';
import Person from '../../assets/svg/person.svg';
import Quote from '../../assets/svg/quote.svg';
import RadioSelected from '../../assets/svg/radio-selected.svg';
import RadioUnselected from '../../assets/svg/radio-unselected.svg';
import Refresh from '../../assets/svg/refresh.svg';
import Settings from '../../assets/svg/settings.svg';
import { useColor } from '../../hooks/use-color/use-color';
import { useSpacing } from '../../hooks/use-spacing/use-spacing';

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
    MarkunreadMailbox = 'MarkunreadMailbox',
    Add = 'Add',
    Close = 'Close',
    Fingerprint = 'Fingerprint',
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
    [SVGType.MarkunreadMailbox]: MarkunreadMailbox,
    [SVGType.Add]: Add,
    [SVGType.Close]: Close,
    [SVGType.Fingerprint]: Fingerprint,
};

export type SVG = React.FunctionComponent<XmlProps> & {
    [type in SVGType]: React.FunctionComponent<WrappedSVGProps>;
};

interface WrappedSVGProps extends SVGProps {
    fill?: `${ColorToken}`;
    stroke?: `${ColorToken}`;
    size?: `${SpacingToken}`;
}

const useDefinedShape = <V, T>(builder: (value: V) => T, value: V) =>
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useMemo(() => (value ? builder(value) : {}), [value]);

const wrapSVG = (Component: SVGComponent) => {
    const Wrapped: React.FunctionComponent<WrappedSVGProps> = props => {
        const { size, fill, stroke, ...svg } = props;

        const formatted = Object.assign(
            {},
            useDefinedShape(fill => ({ fill }), useColor(fill)),
            useDefinedShape(stroke => ({ stroke }), useColor(stroke)),
            useDefinedShape(spacing => ({ height: spacing, width: spacing }), useSpacing(size)),
        );
        return <Component preserveAspectRatio="xMidyMid meet" {...svg} {...formatted} />;
    };
    Wrapped.displayName = `SVG(${Component.displayName})`;

    return Wrapped;
};

const createSVG = (): SVG => {
    const Component: React.FunctionComponent<XmlProps> = props => <SvgXml {...props} />;
    return Object.entries(mapping).reduce<SVG>(
        (Component, [key, variant]) => Object.assign(Component, { [key]: wrapSVG(variant) }),
        Component as SVG,
    );
};

type DynamicProps = WrappedSVGProps & {
    image: SVGType;
};

const Dynamic: React.FunctionComponent<DynamicProps> = props => {
    const { image, ...svg } = props;
    const Image = SVG[image];
    return <Image {...svg} />;
};

const SVG = Object.assign(createSVG(), { Dynamic });

export default SVG;

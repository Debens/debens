import React, { memo } from 'react';

import { Button, ButtonProps, Paragraph, SVG, SVGType } from '@debens/mobile-atoms';

export interface AuxButtonProps extends ButtonProps {
    image: SVGType;
}

const AuxButton: React.FunctionComponent<AuxButtonProps> = props => {
    const { image, children, ...button } = props;
    return (
        <Button.Frame flexDirection="row" alignItems="center" {...button} borderRadius="xlarge">
            <Paragraph marginRight="xsmall" color="$text-on-color">
                {children}
            </Paragraph>
            <SVG.Dynamic
                image={image}
                preserveAspectRatio="xMidyMid meet"
                size="medium"
                fill="$text-on-color"
            />
        </Button.Frame>
    );
};

AuxButton.defaultProps = {
    backgroundColor: '$button-primary',
    activeColor: '$button-primary-active',
    paddingY: 'xsmall',
    paddingX: 'small',
};

export default memo(AuxButton);

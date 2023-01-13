import React, { memo } from 'react';

import {
    Button,
    ButtonProps,
    Grid,
    Loader,
    Paragraph,
    SVG,
    SVGType,
} from '@debens/mobile-atoms';

export type NavigationRowProps = ButtonProps & {
    image?: SVGType;
    heading: string;
};

export const NavigationRow: React.FunctionComponent<NavigationRowProps> = props => {
    const { image, heading, children, ...button } = props;

    return (
        <Button.Frame {...button}>
            <Grid flexDirection="row">
                <Loader data={image}>
                    {({ data }) => (
                        <Grid marginRight="medium">
                            <SVG.Dynamic image={data} />
                        </Grid>
                    )}
                </Loader>
                <Grid>
                    <Paragraph typeset="$heading" marginBottom="small">
                        {heading}
                    </Paragraph>
                    {children}
                </Grid>
                <Grid flex={1} flexDirection="row" justifyContent="flex-end">
                    <SVG.ChevronLeft style={{ transform: [{ rotate: '180deg' }] }} />
                </Grid>
            </Grid>
        </Button.Frame>
    );
};

NavigationRow.defaultProps = {
    borderRadius: 'small',
    backgroundColor: '$layer-01',
    activeColor: '$layer-active-01',
    padding: 'medium',
};

export default memo(NavigationRow);

import React, { memo, useMemo } from 'react';

import { Grid, GridProps, ThematicBreak } from '@training/mobile-atoms/src';

import { FacePackType } from '../../face-pack/model';
import { isDefined } from '../../utils/is-defined';
import { useFaceSource, useProfiles } from '../FaceProvider/face-hooks';
import FaceFacade from '../faces/FaceFacade/FaceFacade';
import { FaceEmotion } from '../GameProvider/game-context';

interface FacePackPreview extends GridProps {
    type: FacePackType;
}

const FacePackPreview: React.FunctionComponent<FacePackPreview> = props => {
    const { type, children, ...grid } = props;

    const profiles = useProfiles(type);
    const source = useFaceSource();
    const faces = useMemo(() => {
        return profiles
            .map(name => ({ name, source: source.get(name)! }))
            .filter(({ source }) => isDefined(source));
    }, [profiles, JSON.stringify(profiles)]);

    return (
        <Grid borderRadius="medium" {...grid}>
            <Grid variant="gutter">{children}</Grid>
            <ThematicBreak color="$background-primary" />
            <Grid variant="gutter" flexDirection="row" flexWrap="wrap" py="medium">
                {faces.map(({ source }, i) => (
                    <FaceFacade
                        key={i}
                        resizeMode="contain"
                        height={48}
                        width={48}
                        emotion={FaceEmotion.Neutral}
                        {...source}
                    />
                ))}
            </Grid>
        </Grid>
    );
};

export default memo(FacePackPreview);

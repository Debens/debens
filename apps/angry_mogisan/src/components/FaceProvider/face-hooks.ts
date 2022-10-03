import { useCallback, useContext, useMemo, useState } from 'react';

import { FacePackType } from '../../face-pack/model';
import { useFacePack } from '../../face-pack/use-face-pack';
import { useStartEffect } from '../GameProvider/game-hooks';

import context from './face-context';

const useFaceContext = () => useContext(context);

export const useFaceScale = () => useFaceContext().scaling;

export const useFaceSource = () => useFaceContext().source;

export const useFaceNames = () => {
    const source = useFaceSource();

    return useMemo(() => source.getNames(), [source]);
};

export const useFace = (name: string) => {
    const source = useFaceSource();

    return useMemo(() => source.get(name), [source, name]);
};

export const useCurrentFacePackType = () => {
    const { pack, setPack } = useFaceContext();

    return [pack, setPack] as const;
};

export const useCurrentFacePack = () => {
    const [type] = useCurrentFacePackType();

    return useFacePack(type);
};

export const useProfiles = (type: FacePackType) => useFacePack(type).profiles;

export const useRandomProfile = (type: FacePackType) => {
    const profiles = useProfiles(type);

    /* Kinda janky, both disables are valid. */
    const getRandom = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        () => profiles[Math.floor(Math.random() * profiles.length)]!,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [JSON.stringify(profiles)],
    );

    const [profile, setProfile] = useState(getRandom());
    const getNext = useCallback(() => setProfile(getRandom()), [getRandom]);

    return [profile, getNext] as const;
};

export const useRandomGameFace = () => {
    const [type] = useCurrentFacePackType();
    const [profile, next] = useRandomProfile(type);

    useStartEffect(next);

    return useFace(profile);
};

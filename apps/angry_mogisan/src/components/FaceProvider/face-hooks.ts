import { useCallback, useContext, useState } from 'react';

import { FacePackType } from '../../face-pack/model';
import { useFaceConfiguration } from '../../face-pack/use-face-pack';
import { useStartEffect } from '../GameProvider/game-hooks';

import context from './face-context';

export const useFacePack = () => {
    const { pack, setPack } = useContext(context);

    return [pack, setPack] as const;
};

export const useRandomProfile = (type: FacePackType) => {
    const { profiles } = useFaceConfiguration(type);

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

export const useFaceProfile = () => {
    const [type] = useFacePack();
    const [profile, next] = useRandomProfile(type);

    useStartEffect(next);

    return profile;
};
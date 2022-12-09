import { useContext, useMemo } from 'react';

import { shuffle } from 'shuffle-seed';

import { FacePackType } from '../../face-pack/model';
import { useFacePack } from '../../face-pack/use-face-pack';
import { ROW_COUNT } from '../GameProvider/game-context';
import { usePositionCount, useSeed } from '../GameProvider/game-hooks';

import context from './face-context';

const useFaceContext = () => useContext(context);

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

const useGameFaces = () => {
    const [type] = useCurrentFacePackType();
    const options = useProfiles(type);

    const seed = useSeed();
    const count = usePositionCount();

    return useMemo(() => {
        const concatenations = Math.ceil(count / options.length);
        const profiles = Array.from<string[]>({ length: concatenations }).fill(options).flat();

        return shuffle(profiles, seed).slice(0, count);
    }, [type, seed, count]);
};

export const useGameFace = (x: number, y: number) => {
    const faces = useGameFaces();

    return useFace(faces[x * ROW_COUNT + y]!);
};

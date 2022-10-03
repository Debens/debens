import { FaceType } from '../../face-book/model';
import { LOCAL_SOURCES } from '../../face-book/sources/local/local-sources';
import { FacePack } from '../model';

export const tandem: FacePack = {
    profiles: Object.entries(LOCAL_SOURCES)
        .filter(([_, face]) => face.type === FaceType.Image)
        .map(([name]) => name),
};

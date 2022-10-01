import { BundledProfileName } from '../../face-book/bundled/model';
import { FacePack, FaceType } from '../model';

export const mogan: FacePack = {
    profiles: [
        {
            type: FaceType.Bundled,
            name: BundledProfileName.Morgan,
        },
    ],
};

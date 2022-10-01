import { BundledProfileName } from '../../face-book/bundled/model';
import { FacePack, FaceType } from '../model';

export const tandem: FacePack = {
    profiles: Object.values(BundledProfileName).map(name => ({
        type: FaceType.Bundled,
        name,
    })),
};

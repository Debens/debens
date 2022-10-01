import { ComponentisedProfile } from '../../face-book/componentised/model';
import { FacePack, FaceType } from '../model';

export const cards: FacePack = {
    profiles: [
        {
            type: FaceType.Component,
            name: ComponentisedProfile.Card,
        },
    ],
};

import { BundledProfileName } from '../face-book/bundled/model';
import { ComponentisedProfile } from '../face-book/componentised/model';

export enum FacePackType {
    Debug = 'debug',
    Cards = 'cards',
    Mogan = 'mógan',
    Sherif = 'sherif',
    Tandem = 'tandem',
}

export enum FaceType {
    Component = 'component',
    Bundled = 'bundled',
}

export interface ComponentFace {
    type: FaceType.Component;
    name: ComponentisedProfile;
}

export interface BundledFace {
    type: FaceType.Bundled;
    name: BundledProfileName;
}

export type Profile = BundledFace | ComponentFace;

export interface FacePack {
    profiles: Profile[];
}

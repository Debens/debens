import { ImageSourcePropType } from 'react-native';

import { FaceEmotion } from '../components/GameProvider/game-context';

export enum FaceType {
    Image = 'image',
    Component = 'component',
}

export interface ImageFaceDef {
    type: FaceType.Image;
    emotions: Record<FaceEmotion, ImageSourcePropType>;
}

export enum ComponentProfileName {
    Debug = 'debug',
    Card = 'card',
}

export interface ComponentFaceDef {
    type: FaceType.Component;
    component: ComponentProfileName;
}

export type Face = ImageFaceDef | ComponentFaceDef;

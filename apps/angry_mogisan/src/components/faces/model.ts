import { FaceEmotion } from '../GameProvider/game-context';

export interface FaceProps {
    emotion: FaceEmotion;
}

export enum FacePack {
    Debug = 'debug',
    Card = 'card',
    Morgan = 'morgan',
}

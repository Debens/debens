import { GridProps } from '@training/mobile-atoms';

import { FaceEmotion } from '../GameProvider/game-context';

export interface FaceProps extends GridProps {
    emotion: FaceEmotion;
}

export enum FacePack {
    Debug = 'debug',
    Card = 'card',
    Morgan = 'morgan',
    Taz = 'taz',
}

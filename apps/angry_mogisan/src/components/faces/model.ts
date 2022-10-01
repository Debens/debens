import { GridProps } from '@training/mobile-atoms';

import { FaceEmotion } from '../GameProvider/game-context';

export interface FaceProps extends GridProps {
    emotion: FaceEmotion;
}

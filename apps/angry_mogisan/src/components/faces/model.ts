import { GridProps } from '@debens/mobile-atoms';

import { FaceEmotion } from '../GameProvider/game-context';

export interface BaseFaceProps extends GridProps {
    emotion: FaceEmotion;
}

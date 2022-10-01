import { ImageSourcePropType } from 'react-native';

import { FaceEmotion } from '../../components/GameProvider/game-context';

export enum BundledProfileName {
    Alex = 'Alex',
    Andrew = 'Andrew',
    Dan = 'Dan',
    Georgia = 'Georgia',
    Mark = 'Mark',
    Marlin = 'Marlin',
    Morgan = 'Morgan',
    Nikunj = 'Nikunj',
    Sarah = 'Sarah',
    Stefan = 'Stefan',
    Taz = 'Taz',
}

export interface BundledProfile {
    emotions: {
        [FaceEmotion.Neutral]: ImageSourcePropType;
        [FaceEmotion.Calm]?: ImageSourcePropType;
        [FaceEmotion.Angry]?: ImageSourcePropType;
    };
}

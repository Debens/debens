import { FaceEmotion } from '../../components/GameProvider/game-context';

import { BundledProfile, BundledProfileName } from './model';

type BundledProfiles = Record<BundledProfileName, BundledProfile>;

export const BUNDLED_PROFILES: BundledProfiles = {
    [BundledProfileName.Alex]: {
        emotions: {
            [FaceEmotion.Neutral]: require('./images/alex/happy-alex.png'),
            [FaceEmotion.Calm]: require('./images/alex/happy-alex.png'),
            [FaceEmotion.Angry]: require('./images/taz/angry-taz.png'),
        },
    },
    [BundledProfileName.Andrew]: {
        emotions: {
            [FaceEmotion.Neutral]: require('./images/andrew/happy-andrew.png'),
            [FaceEmotion.Calm]: require('./images/andrew/happy-andrew.png'),
            [FaceEmotion.Angry]: require('./images/morgan/angry-morgan.png'),
        },
    },
    [BundledProfileName.Dan]: {
        emotions: {
            [FaceEmotion.Neutral]: require('./images/dan/happy-dan.png'),
            [FaceEmotion.Calm]: require('./images/dan/happy-dan.png'),
            [FaceEmotion.Angry]: require('./images/taz/angry-taz.png'),
        },
    },
    [BundledProfileName.Georgia]: {
        emotions: {
            [FaceEmotion.Neutral]: require('./images/georgia/happy-georgia.png'),
            [FaceEmotion.Calm]: require('./images/georgia/happy-georgia.png'),
            [FaceEmotion.Angry]: require('./images/morgan/angry-morgan.png'),
        },
    },
    [BundledProfileName.Mark]: {
        emotions: {
            [FaceEmotion.Neutral]: require('./images/mark/happy-mark.png'),
            [FaceEmotion.Calm]: require('./images/mark/happy-mark.png'),
            [FaceEmotion.Angry]: require('./images/morgan/angry-morgan.png'),
        },
    },
    [BundledProfileName.Marlin]: {
        emotions: {
            [FaceEmotion.Neutral]: require('./images/marlin/happy-marlin.png'),
            [FaceEmotion.Calm]: require('./images/marlin/happy-marlin.png'),
            [FaceEmotion.Angry]: require('./images/taz/angry-taz.png'),
        },
    },
    [BundledProfileName.Morgan]: {
        emotions: {
            [FaceEmotion.Neutral]: require('./images/morgan/happy-morgan.png'),
            [FaceEmotion.Calm]: require('./images/morgan/happy-morgan.png'),
            [FaceEmotion.Angry]: require('./images/morgan/angry-morgan.png'),
        },
    },
    [BundledProfileName.Nikunj]: {
        emotions: {
            [FaceEmotion.Neutral]: require('./images/nikunj/happy-nikunj.png'),
            [FaceEmotion.Calm]: require('./images/nikunj/happy-nikunj.png'),
            [FaceEmotion.Angry]: require('./images/taz/angry-taz.png'),
        },
    },
    [BundledProfileName.Sarah]: {
        emotions: {
            [FaceEmotion.Neutral]: require('./images/sarah/happy-sarah.png'),
            [FaceEmotion.Calm]: require('./images/sarah/happy-sarah.png'),
            [FaceEmotion.Angry]: require('./images/taz/angry-taz.png'),
        },
    },
    [BundledProfileName.Stefan]: {
        emotions: {
            [FaceEmotion.Neutral]: require('./images/stefan/happy-stefan.png'),
            [FaceEmotion.Calm]: require('./images/stefan/happy-stefan.png'),
            [FaceEmotion.Angry]: require('./images/morgan/angry-morgan.png'),
        },
    },
    [BundledProfileName.Taz]: {
        emotions: {
            [FaceEmotion.Neutral]: require('./images/taz/happy-taz.png'),
            [FaceEmotion.Calm]: require('./images/taz/happy-taz.png'),
            [FaceEmotion.Angry]: require('./images/taz/angry-taz.png'),
        },
    },
};

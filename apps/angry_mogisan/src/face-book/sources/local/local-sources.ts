import { FaceEmotion } from '../../../components/GameProvider/game-context';
import { ComponentProfileName, Face, FaceType } from '../../model';

export const LOCAL_SOURCES: Record<string, Face> = {
    Debug: {
        type: FaceType.Component,
        component: ComponentProfileName.Debug,
    },
    Cards: {
        type: FaceType.Component,
        component: ComponentProfileName.Card,
    },
    Alex: {
        type: FaceType.Image,
        emotions: {
            [FaceEmotion.Neutral]: require('./images/alex/happy-alex.png'),
            [FaceEmotion.Calm]: require('./images/alex/happy-alex.png'),
            [FaceEmotion.Angry]: require('./images/taz/angry-taz.png'),
        },
    },
    Andrew: {
        type: FaceType.Image,
        emotions: {
            [FaceEmotion.Neutral]: require('./images/andrew/happy-andrew.png'),
            [FaceEmotion.Calm]: require('./images/andrew/happy-andrew.png'),
            [FaceEmotion.Angry]: require('./images/morgan/angry-morgan.png'),
        },
    },
    Dan: {
        type: FaceType.Image,
        emotions: {
            [FaceEmotion.Neutral]: require('./images/dan/happy-dan.png'),
            [FaceEmotion.Calm]: require('./images/dan/happy-dan.png'),
            [FaceEmotion.Angry]: require('./images/taz/angry-taz.png'),
        },
    },
    Georgia: {
        type: FaceType.Image,
        emotions: {
            [FaceEmotion.Neutral]: require('./images/georgia/happy-georgia.png'),
            [FaceEmotion.Calm]: require('./images/georgia/happy-georgia.png'),
            [FaceEmotion.Angry]: require('./images/morgan/angry-morgan.png'),
        },
    },
    Mark: {
        type: FaceType.Image,
        emotions: {
            [FaceEmotion.Neutral]: require('./images/mark/happy-mark.png'),
            [FaceEmotion.Calm]: require('./images/mark/happy-mark.png'),
            [FaceEmotion.Angry]: require('./images/morgan/angry-morgan.png'),
        },
    },
    Marlin: {
        type: FaceType.Image,
        emotions: {
            [FaceEmotion.Neutral]: require('./images/marlin/happy-marlin.png'),
            [FaceEmotion.Calm]: require('./images/marlin/happy-marlin.png'),
            [FaceEmotion.Angry]: require('./images/taz/angry-taz.png'),
        },
    },
    Morgan: {
        type: FaceType.Image,
        emotions: {
            [FaceEmotion.Neutral]: require('./images/morgan/happy-morgan.png'),
            [FaceEmotion.Calm]: require('./images/morgan/happy-morgan.png'),
            [FaceEmotion.Angry]: require('./images/morgan/angry-morgan.png'),
        },
    },
    Nikunj: {
        type: FaceType.Image,
        emotions: {
            [FaceEmotion.Neutral]: require('./images/nikunj/happy-nikunj.png'),
            [FaceEmotion.Calm]: require('./images/nikunj/happy-nikunj.png'),
            [FaceEmotion.Angry]: require('./images/taz/angry-taz.png'),
        },
    },
    Sarah: {
        type: FaceType.Image,
        emotions: {
            [FaceEmotion.Neutral]: require('./images/sarah/happy-sarah.png'),
            [FaceEmotion.Calm]: require('./images/sarah/happy-sarah.png'),
            [FaceEmotion.Angry]: require('./images/taz/angry-taz.png'),
        },
    },
    Stefan: {
        type: FaceType.Image,
        emotions: {
            [FaceEmotion.Neutral]: require('./images/stefan/happy-stefan.png'),
            [FaceEmotion.Calm]: require('./images/stefan/happy-stefan.png'),
            [FaceEmotion.Angry]: require('./images/morgan/angry-morgan.png'),
        },
    },
    Taz: {
        type: FaceType.Image,
        emotions: {
            [FaceEmotion.Neutral]: require('./images/taz/happy-taz.png'),
            [FaceEmotion.Calm]: require('./images/taz/happy-taz.png'),
            [FaceEmotion.Angry]: require('./images/taz/angry-taz.png'),
        },
    },
};

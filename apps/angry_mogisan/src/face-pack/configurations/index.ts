import { FacePack, FacePackType } from '../model';

import { cards } from './cards';
import { debug } from './debug';
import { mogan } from './mogan';
import { sherif } from './sherif';
import { tandem } from './tandem';

export const configurations: Record<FacePackType, FacePack> = {
    debug,
    cards,
    mógan: mogan,
    sherif,
    tandem,
};

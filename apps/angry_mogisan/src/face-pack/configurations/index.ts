import { FacePack, FacePackType } from '../model';

import { sez } from './angy-sez';
import { cards } from './cards';
import { debug } from './debug';
import { mandem } from './mandem';
import { mogan } from './mogan';
import { sherif } from './sherif';

export const configurations: Record<FacePackType, FacePack> = {
    mandem,
    mógan: mogan,
    sherif,
    'angy sez': sez,
    cards,
    debug,
};

import { useMemo } from 'react';

import { configurations } from './configurations/index';
import { FacePackType } from './model';

export const useFacePack = (type: FacePackType) => useMemo(() => configurations[type], [type]);

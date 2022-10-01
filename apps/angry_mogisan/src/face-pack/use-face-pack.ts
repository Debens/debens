import { useMemo } from 'react';

import { configurations } from './configurations/index';
import { FacePackType } from './model';

export const useFaceConfiguration = (type: FacePackType) => useMemo(() => configurations[type], [type]);

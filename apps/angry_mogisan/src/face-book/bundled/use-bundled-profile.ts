import { useMemo } from 'react';

import { BUNDLED_PROFILES } from './bundled-profiles';
import { BundledProfileName } from './model';

export const useBundledProfile = (name: BundledProfileName) => useMemo(() => BUNDLED_PROFILES[name], [name]);

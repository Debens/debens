import { BundledProfileName } from './bundled/model';
import { ComponentisedProfile } from './componentised/model';

export type ProfileToken = `${BundledProfileName}` | `${ComponentisedProfile}`;

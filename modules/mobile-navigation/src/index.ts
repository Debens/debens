import * as actions from './actions';
import { module } from './module';

export * from './NavigationProvider';

export const auth = { module, actions };

export default auth;

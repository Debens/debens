import { module } from './module';
import session from './session';

const actions = {
    session: session.actions.started,
    LOGGED_IN: session.actions.STARTED,
    LOGGED_OUT: session.actions.STOPPED,
};

const selectors = {
    loading: session.selectors.loading,
};

export const auth = { module, actions, selectors };

export default auth;

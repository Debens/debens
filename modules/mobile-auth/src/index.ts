import { module } from './module';
import session from './session';

const actions = {
    session: session.actions.start,
    LOGGED_IN: session.actions.STARTED,
    LOGGED_OUT: session.actions.STOPPED,
};

const selectors = {
    loading: session.selectors.loading,
};

export const auth = { module, actions, selectors, tokens: session.tokens };

export default auth;

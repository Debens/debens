import login from './login';
import { module } from './module';
import registration from './registration';
import session from './session';

const actions = {
    login: login.actions.login,
    register: registration.actions.register,
    LOGGED_IN: session.actions.STARTED,
    LOGGED_PUT: session.actions.STOPPED,
};

const selectors = {
    loading: session.selectors.loading,
};

export const auth = { module, actions, selectors };

export default auth;

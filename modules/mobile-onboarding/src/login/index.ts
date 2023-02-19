import * as actions from './login.actions';
import reducer from './login.reducer';
import saga from './login.saga';
import * as selectors from './login.selectors';

export const login = { actions, saga, selectors, reducer };

export default login;

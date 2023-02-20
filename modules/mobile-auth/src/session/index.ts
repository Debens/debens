import * as actions from './session.actions';
import reducer from './session.reducer';
import saga from './session.saga';
import * as selectors from './session.selectors';
import * as tokens from './session.tokens';

export const session = { actions, selectors, reducer, saga, tokens };

export default session;

import * as actions from './passkey.actions';
import reducer from './passkey.reducer';
import saga from './passkey.saga';
import * as selectors from './passkey.selectors';

export const passkey = { actions, saga, selectors, reducer };

export default passkey;

import * as actions from './passcode.actions';
import reducer from './passcode.reducer';
import saga from './passcode.saga';
import * as selectors from './passcode.selectors';

export const passcode = { actions, saga, selectors, reducer };

export default passcode;

import * as actions from './snackbar.actions';
import reducer from './snackbar.reducer';
import saga from './snackbar.saga';
import * as selectors from './snackbar.selectors';

export * from './snackbar.state';

export const snackbar = { actions, reducer, saga, selectors };

export default snackbar;

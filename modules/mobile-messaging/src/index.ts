import { module } from './module';
import { snackbar } from './snackbar';

const actions = {
    snackbar: snackbar.actions.show,
};

export { default as SnackbarView } from './components/SnackbarView/SnackbarView';

export const messaging = { module, actions };

export default messaging;

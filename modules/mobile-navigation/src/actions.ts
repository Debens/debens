import { createAction } from 'redux-actions';

export interface INavigatePayload {
    name: string;
}

export const NAVIGATE = 'navigation/navigate';
export const navigate = createAction<INavigatePayload>(NAVIGATE);

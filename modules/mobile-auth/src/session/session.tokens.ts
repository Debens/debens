import { SecureValueStore } from '../services/secure-value-store';

export const access = new SecureValueStore('access_token');

export const refresh = new SecureValueStore('refresh_token');

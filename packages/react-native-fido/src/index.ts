import { NativeModules } from 'react-native';

export * from './services/Assertion/Assertion';
export * from './services/Attestation/Attestation';

export type { AssertionRequest } from './native-module';

export const module = NativeModules.Fido;

import { NativeModules } from 'react-native';

export type { AssertionResponse as AssertionRequest } from './native-module';

export const module = NativeModules.Fido;

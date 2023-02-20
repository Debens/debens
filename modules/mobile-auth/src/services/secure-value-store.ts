import EncryptedStorage from 'react-native-encrypted-storage';

export class SecureValueStore {
    constructor(private readonly key: string) {}

    get = () => EncryptedStorage.getItem(this.key);

    set = (value: string) => EncryptedStorage.setItem(this.key, value);
}

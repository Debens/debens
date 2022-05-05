import { cleanup } from '@testing-library/react-native';

afterAll(async () => {
    await new Promise((resolve) =>
        setTimeout(() => {
            cleanup();
            resolve(undefined);
        }, 0)
    );
});

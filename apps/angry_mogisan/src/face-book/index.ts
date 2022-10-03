import { FaceBook } from './face-book';
import { LocalSource } from './sources/local/local-source';

export const facebook = new FaceBook({
    sources: [new LocalSource()],
});

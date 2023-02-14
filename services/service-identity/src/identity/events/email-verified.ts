import { StorableEvent } from '@debens/event-sourcing';

type EmailVerifiedData = {
    challenge: string;
};

export class EmailVerified extends StorableEvent<EmailVerifiedData> {
    constructor(public readonly id: string, public readonly data: EmailVerifiedData) {
        super(id, 'identity');
    }
}

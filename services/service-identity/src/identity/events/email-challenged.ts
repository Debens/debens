import { StorableEvent } from '@debens/event-sourcing';

type EmailChallengedData = {
    id: string;
    challengedOn: string;
    lifetime: { seconds: number };
};

export class EmailChallenged extends StorableEvent<EmailChallengedData> {
    constructor(public readonly id: string, public readonly data: EmailChallengedData) {
        super(id, 'identity');
    }
}

import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
    constructor(id: string) {
        this.id = id;
    }

    @Field(_type => ID)
    id: string;
}

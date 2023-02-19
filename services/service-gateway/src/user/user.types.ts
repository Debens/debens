import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
    constructor(id: string) {
        this.id = id;
    }

    @Field(_type => ID)
    id: string;
}
